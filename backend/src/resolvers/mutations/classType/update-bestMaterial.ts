import { ClassTypeModel } from "@/models";
import { transformDocument, mapClassYearToGraphQL } from "@/lib/enumUtils";

export const updateBestMaterial = async (_: unknown, { id, input }: any) => {
  const { classTypeId, studentId, materialImages, description } = input;
  const classType = await ClassTypeModel.findById(classTypeId);

  if (!classType) {
    throw new Error("ClassType not found");
  }

  const bestMaterialIndex = classType.bestMaterials.findIndex(
    (bm: any) => bm.studentId.toString() === id
  );

  if (bestMaterialIndex === -1) {
    throw new Error("BestMaterial not found");
  }

  classType.bestMaterials[bestMaterialIndex] = {
    studentId,
    materialImages,
    description,
  };

  await classType.save();

  const populatedClassType = await ClassTypeModel.findById(classTypeId)
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
    });

  if (!populatedClassType) {
    throw new Error("Failed to populate classType data");
  }

  const transformed = transformDocument(populatedClassType);

  if (transformed.questions) {
    transformed.questions = transformed.questions.map((question: any) => ({
      ...question,
      id: question._id?.toString() || question.id,
      _id: undefined,
    }));
  }

  if (transformed.classYear) {
    transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
  }

  const updatedBestMaterial = classType.bestMaterials[bestMaterialIndex];
  return {
    studentId: updatedBestMaterial.studentId.toString(),
    materialImages: updatedBestMaterial.materialImages,
    description: updatedBestMaterial.description,
  };
};
