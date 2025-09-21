import { GraphQLError } from "graphql";
import { assignStudentsToRoom as assignStudentsToRoomUtil } from "../../../utils/room-assignment";

export const assignStudentsToRoom = async (
  _: unknown,
  { classTypeId, roomNumber }: { classTypeId: string; roomNumber: number }
) => {
  try {
    const assignedStudentIds = await assignStudentsToRoomUtil(
      classTypeId,
      roomNumber
    );

    return {
      success: true,
      classTypeId,
      roomNumber,
      assignedStudentCount: assignedStudentIds.length,
      assignedStudentIds,
    };
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
