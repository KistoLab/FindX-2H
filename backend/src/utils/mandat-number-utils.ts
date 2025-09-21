import { StudentAnswerModel } from "../models";

/**
 * Gets the mandat number for a student in a specific classType/olympiad
 * @param studentId - The student's ID
 * @param classTypeId - The classType ID
 * @returns The mandat number if found, null otherwise
 */
export const getMandatNumberForStudent = async (
  studentId: string,
  classTypeId: string
): Promise<string | null> => {
  try {
    const studentAnswer = await StudentAnswerModel.findOne({
      studentId,
      classTypeId,
    });

    return studentAnswer?.mandatNumber || null;
  } catch (error) {
    console.error("Error getting mandat number:", error);
    return null;
  }
};

/**
 * Gets all mandat numbers for a student across all olympiads
 * @param studentId - The student's ID
 * @returns Array of objects with classTypeId and mandatNumber
 */
export const getAllMandatNumbersForStudent = async (
  studentId: string
): Promise<Array<{ classTypeId: string; mandatNumber: string }>> => {
  try {
    const studentAnswers = await StudentAnswerModel.find({
      studentId,
      mandatNumber: { $exists: true, $ne: "" },
    }).select("classTypeId mandatNumber");

    return studentAnswers
      .filter((answer) => answer.mandatNumber) // Filter out undefined mandatNumbers
      .map((answer) => ({
        classTypeId: answer.classTypeId.toString(),
        mandatNumber: answer.mandatNumber!,
      }));
  } catch (error) {
    console.error("Error getting all mandat numbers:", error);
    return [];
  }
};

/**
 * Checks if a mandat number is already in use
 * @param mandatNumber - The mandat number to check
 * @returns true if in use, false otherwise
 */
export const isMandatNumberInUse = async (
  mandatNumber: string
): Promise<boolean> => {
  try {
    const existingAnswer = await StudentAnswerModel.findOne({ mandatNumber });
    return !!existingAnswer;
  } catch (error) {
    console.error("Error checking mandat number:", error);
    return false;
  }
};
