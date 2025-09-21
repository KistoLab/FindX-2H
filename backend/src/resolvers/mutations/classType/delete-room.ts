import { ClassTypeModel, StudentAnswerModel } from "../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const deleteRoom = async (
  _: unknown,
  { classTypeId, roomNumber }: { classTypeId: string; roomNumber: number }
) => {
  try {
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new GraphQLError("ClassType not found");
    }

    // Find the room to delete
    const roomIndex = classType.rooms.findIndex(
      (room) => room.roomNumber === roomNumber
    );
    if (roomIndex === -1) {
      throw new GraphQLError("Room not found in this ClassType");
    }

    // Remove room number from all students in this room
    await StudentAnswerModel.updateMany(
      { classTypeId, roomNumber },
      { $unset: { roomNumber: 1 } }
    );

    // Remove room from ClassType
    classType.rooms.splice(roomIndex, 1);
    await classType.save();

    return transformDocument(classType);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
