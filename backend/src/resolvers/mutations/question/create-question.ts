import { QuestionModel } from "@/models";
import { transformDocument } from "@/lib/enumUtils";

export const createQuestion = async (_: any, { input }: any) => {
  const { classTypeId, questionName, maxScore } = input;
  
  const question = new QuestionModel({
    classTypeId,
    questionName,
    maxScore,
  });
  
  await question.save();
  
  return transformDocument(question);
};
