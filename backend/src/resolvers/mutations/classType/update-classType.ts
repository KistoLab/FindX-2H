import { ClassTypeModel } from "@/models";
import {
  transformDocument,
  transformNestedObject,
  mapClassYearToDB,
  mapClassYearToGraphQL,
} from "@/lib/enumUtils";

export const updateClassType = async (_: unknown, { id, input }: any) => {
  const updateData: any = { ...input };

  if (input.classYear) {
    updateData.classYear = mapClassYearToDB(input.classYear);
  }

  const updatedClassType = await ClassTypeModel.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  )
    .populate({
      path: "questions",
      model: "Question",
    })
    .populate({
      path: "olympiadId",
      select: "name",
    });

  if (!updatedClassType) {
    throw new Error("ClassType not found");
  }

  const transformed = transformDocument(updatedClassType);

  if (transformed.questions) {
    transformed.questions = transformNestedObject(transformed.questions);
  }

  if (transformed.classYear) {
    transformed.classYear = mapClassYearToGraphQL(transformed.classYear);
  }

  return transformed;
};
