// Helper function to format grade as "n-р анги"
export const formatGrade = (classString: string) => {
  if (!classString) return "Тодорхойгүй анги";

  // Remove "GRADE_" prefix and get the number
  const gradeNumber = classString.replace("GRADE_", "");
  const num = parseInt(gradeNumber);

  if (isNaN(num)) return classString;

  // Convert to Mongolian ordinal format
  return `${num}-р анги`;
};
