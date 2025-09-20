import { QuestionModel } from "@/models";
import { transformDocument } from "@/lib/enumUtils";

export const updateQuestion = async (_: any, { id, input }: any) => {
  const { questionName, maxScore } = input;
  
  const question = await QuestionModel.findByIdAndUpdate(
    id,
    { questionName, maxScore },
    { new: true }
  );
  
  if (!question) {
    throw new Error("Question not found");
  }
  
  return transformDocument(question);
};
