import { getMandatNumberForStudent as getMandatNumberUtil } from "../../../../utils/mandat-number-utils";
import { GraphQLError } from "graphql";

export const getMandatNumberForStudent = async (
  _: unknown,
  { studentId, classTypeId }: { studentId: string; classTypeId: string }
) => {
  try {
    const mandatNumber = await getMandatNumberUtil(studentId, classTypeId);

    if (!mandatNumber) {
      throw new GraphQLError(
        "Mandat number not found for this student and class type"
      );
    }

    return {
      studentId,
      classTypeId,
      mandatNumber,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
