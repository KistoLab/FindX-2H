import { QuestionModel } from "@/models";
import { transformDocument } from "@/lib/enumUtils";

export const questionsByClassType = async (_: any, { classTypeId }: any) => {
  const questions = await QuestionModel.find({ classTypeId });
  
  return questions.map((question) => transformDocument(question));
};

export const question = async (_: any, { id }: any) => {
  const question = await QuestionModel.findById(id);
  
  if (!question) {
    throw new Error("Question not found");
  }
  
  return transformDocument(question);
};
