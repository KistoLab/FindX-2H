import {
  StudentAnswerModel,
  StudentModel,
  ClassTypeModel,
} from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const createStudentAnswer = async (
  _: unknown,
  { input }: { input: any }
) => {
  try {
    const { studentId, classTypeId, answers, image, mandatNumber, roomNumber } =
      input;

    const existingStudent = await StudentModel.findById(studentId);
    if (!existingStudent) throw new GraphQLError("Student does not exist");

    // Verify that the student is a participant in this ClassType
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) throw new GraphQLError("ClassType does not exist");

    if (!classType.participants.includes(studentId as any)) {
      throw new GraphQLError("Student is not registered for this ClassType");
    }

    const totalScoreofOlympiad = Array.isArray(answers)
      ? answers.reduce((sum: number, a: any) => sum + (a?.score ?? 0), 0)
      : 0;

    // Check if StudentAnswer already exists (created during registration)
    let studentAnswer = await StudentAnswerModel.findOne({
      studentId,
      classTypeId,
    });

    if (studentAnswer) {
      // Update existing StudentAnswer with answers
      studentAnswer.answers = answers;
      studentAnswer.totalScoreofOlympiad = totalScoreofOlympiad;
      studentAnswer.image = image || [];
      if (roomNumber) {
        studentAnswer.roomNumber = roomNumber;
      }
      await studentAnswer.save();
    } else {
      // Create new StudentAnswer if it doesn't exist
      studentAnswer = new StudentAnswerModel({
        studentId,
        classTypeId,
        answers,
        totalScoreofOlympiad,
        image: image || [],
        mandatNumber: mandatNumber || undefined, // Use provided mandatNumber or undefined
        roomNumber,
      });

      await studentAnswer.save();

      // Add the student answer to the ClassType's studentsAnswers array
      await ClassTypeModel.findByIdAndUpdate(
        classTypeId,
        { $addToSet: { studentsAnswers: studentAnswer._id } },
        { new: true }
      );
    }

    const transformed = transformDocument(studentAnswer);

    // Transform answers array
    if (transformed.answers) {
      transformed.answers = transformed.answers.map((answer: any) => ({
        questionId: answer.questionId?.toString() || answer.questionId,
        score: answer.score,
        description: answer.description,
      }));
    }

    return transformed;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
