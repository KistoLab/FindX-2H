import { StudentAnswerModel } from "../models";
import { StudentClass } from "../types/generated";

/**
 * Generates a unique 5-digit mandat number for a student
 * Format: [class digits][unique 3-digit number]
 * - For grades 1-9: first digit is grade, second digit is 0, last 3 digits are unique
 * - For grades 10-12: first 2 digits are grade, last 3 digits are unique
 *
 * @param studentClass - The student's class (e.g., GRADE_6, GRADE_11)
 * @param studentId - The student's ID to ensure uniqueness
 * @returns A unique 5-digit mandat number as string
 */
export const generateMandatNumber = async (
  studentClass: StudentClass,
  studentId: string
): Promise<string> => {
  // Extract grade number from class enum (e.g., GRADE_6 -> 6, GRADE_11 -> 11)
  const gradeNumber = parseInt(studentClass.replace("GRADE_", ""));

  let classPrefix: string;

  if (gradeNumber >= 10) {
    // For grades 10-12: use first 2 digits as grade
    classPrefix = gradeNumber.toString();
  } else {
    // For grades 1-9: first digit is grade, second digit is 0
    classPrefix = `${gradeNumber}0`;
  }

  // Generate unique 3-digit suffix based on studentId
  // Use a simple hash of studentId to get consistent but unique numbers
  const studentIdHash = hashString(studentId);
  const uniqueSuffix = Math.abs(studentIdHash) % 1000;

  // Ensure it's always 3 digits
  const uniqueSuffixStr = uniqueSuffix.toString().padStart(3, "0");

  const mandatNumber = `${classPrefix}${uniqueSuffixStr}`;

  // Check if this mandat number already exists
  const existingAnswer = await StudentAnswerModel.findOne({ mandatNumber });
  if (existingAnswer) {
    // If it exists, try with a different suffix by adding studentId length
    const alternativeSuffix = (
      (Math.abs(studentIdHash) + studentId.length) %
      1000
    )
      .toString()
      .padStart(3, "0");
    const alternativeMandatNumber = `${classPrefix}${alternativeSuffix}`;

    // Check if alternative also exists
    const existingAlternative = await StudentAnswerModel.findOne({
      mandatNumber: alternativeMandatNumber,
    });

    if (existingAlternative) {
      // If both exist, use timestamp-based approach
      const timestampSuffix = (Date.now() % 1000).toString().padStart(3, "0");
      return `${classPrefix}${timestampSuffix}`;
    }

    return alternativeMandatNumber;
  }

  return mandatNumber;
};

/**
 * Simple hash function to convert string to number
 * @param str - String to hash
 * @returns Hash value as number
 */
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
};

/**
 * Validates if a mandat number follows the correct format
 * @param mandatNumber - The mandat number to validate
 * @returns true if valid, false otherwise
 */
export const validateMandatNumber = (mandatNumber: string): boolean => {
  // Must be exactly 5 digits
  if (!/^\d{5}$/.test(mandatNumber)) {
    return false;
  }

  const firstDigit = parseInt(mandatNumber[0]);
  const secondDigit = parseInt(mandatNumber[1]);

  // Check if it's a valid grade format
  if (firstDigit >= 1 && firstDigit <= 9) {
    // For grades 1-9: second digit should be 0
    return secondDigit === 0;
  } else if (firstDigit === 1) {
    // For grades 10-12: first two digits should be 10, 11, or 12
    const grade = parseInt(mandatNumber.substring(0, 2));
    return grade >= 10 && grade <= 12;
  }

  return false;
};
