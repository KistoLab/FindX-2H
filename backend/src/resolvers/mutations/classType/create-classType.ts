import { ClassTypeModel } from "@/models";
import { QuestionModel } from "@/models";
import {
  transformDocument,
  mapClassYearToDB,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const createClassType = async (_: unknown, { input }: any) => {
  const { classYear, maxScore, questions, medalists, occuringTime, olympiadId } = input;

  const classType = new ClassTypeModel({
    olympiadId,
    classYear: mapClassYearToDB(classYear),
    maxScore,
    medalists,
    occuringTime,
    questions: [],
  });
  await classType.save();

  const questionIds: any[] = [];
  for (const questionInput of questions) {
    const question = new QuestionModel({
      classTypeId: classType._id,
      questionName: questionInput.questionName,
      maxScore: questionInput.maxScore,
    });
    await question.save();
    questionIds.push(question._id);
  }

  classType.questions = questionIds as any;
  await classType.save();

  const populatedClassType = await ClassTypeModel.findById(classType._id)
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
      model: "Olympiad",
    });

  if (!populatedClassType) {
    throw new Error("Failed to populate classType data");
  }

  const transformed = transformDocument(populatedClassType);

  if (transformed.questions) {
    transformed.questions = transformed.questions.map((question: any) => ({
      ...transformDocument(question),
      id: question._id?.toString() || question.id,
    }));
  }

  if (transformed.classYear) {
    transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
  }

  // Handle olympiadId - convert populated object to ID string
  if (transformed.olympiadId && typeof transformed.olympiadId === "object") {
    transformed.olympiadId =
      transformed.olympiadId._id?.toString() || transformed.olympiadId.id;
  }

  return transformed;
};
