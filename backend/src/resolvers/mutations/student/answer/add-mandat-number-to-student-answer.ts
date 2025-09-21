import { StudentAnswerModel } from "@/models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const addMandatNumberToStudentAnswer = async (
  _: unknown,
  { id, mandatNumber }: { id: string; mandatNumber: string }
) => {
  try {
    const studentAnswer = await StudentAnswerModel.findByIdAndUpdate(
      id,
      { mandatNumber },
      { new: true }
    );

    if (!studentAnswer) {
      throw new GraphQLError("StudentAnswer not found");
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
