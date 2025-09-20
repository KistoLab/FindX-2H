import { QuestionModel } from "@/models";

export const deleteQuestion = async (_: any, { id }: any) => {
  const question = await QuestionModel.findByIdAndDelete(id);
  
  if (!question) {
    throw new Error("Question not found");
  }
  
  return true;
};
