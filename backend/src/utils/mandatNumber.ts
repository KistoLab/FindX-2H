import { ClassYear } from "@/models/ClassType.model";

/**
 * Generate mandat number based on class year and participant index
 * @param classYear - The class year (e.g., "GRADE_6")
 * @param participantIndex - The index in participants array (0-based)
 * @returns mandat number string (e.g., "6010" for Grade 6, index 10)
 */
export const generateMandatNumber = (classYear: ClassYear, participantIndex: number): string => {
  // Extract grade number from ClassYear enum
  let gradeNumber = '';
  if (classYear.startsWith('GRADE_')) {
    gradeNumber = classYear.replace('GRADE_', '');
  } else {
    gradeNumber = classYear;
  }
  
  // Format participant index with leading zeros (2 digits)
  const formattedIndex = participantIndex.toString().padStart(2, '0');
  
  return `${gradeNumber}${formattedIndex}`;
};

/**
 * Parse mandat number to extract grade and index
 * @param mandatNumber - The mandat number (e.g., "6010")
 * @returns object with grade and index
 */
export const parseMandatNumber = (mandatNumber: string): { grade: string; index: number } => {
  if (mandatNumber.length < 3) {
    throw new Error('Invalid mandat number format');
  }
  
  const grade = mandatNumber.slice(0, -2);
  const index = parseInt(mandatNumber.slice(-2), 10);
  
  return { grade, index };
};

/**
 * Get the next available mandat number for a class type
 * @param classTypeId - The class type ID
 * @param classYear - The class year
 * @returns next available mandat number
 */
export const getNextMandatNumber = async (classTypeId: string, classYear: ClassYear): Promise<string> => {
  const { StudentAnswerModel } = await import("@/models/StudentAnswer.model");
  
  // Get all existing mandat numbers for this class type
  const existingAnswers = await StudentAnswerModel.find({ classTypeId });
  const existingMandatNumbers = existingAnswers.map(answer => answer.mandatNumber);
  
  // Find the highest index used
  let maxIndex = -1;
  const gradeNumber = classYear.replace('Grade_', '');
  
  existingMandatNumbers.forEach(mandatNumber => {
    if (mandatNumber.startsWith(gradeNumber)) {
      const { index } = parseMandatNumber(mandatNumber);
      if (index > maxIndex) {
        maxIndex = index;
      }
    }
  });
  
  // Return next mandat number
  return generateMandatNumber(classYear, maxIndex + 1);
};
