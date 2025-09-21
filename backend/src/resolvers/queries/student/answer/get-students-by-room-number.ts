import { StudentAnswerModel } from "../../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const getStudentsByRoomNumber = async (
  _: unknown,
  { roomNumber }: { roomNumber: string }
) => {
  try {
    const studentAnswers = await StudentAnswerModel.find({ roomNumber });

    return studentAnswers.map((studentAnswer) => {
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
    });
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
