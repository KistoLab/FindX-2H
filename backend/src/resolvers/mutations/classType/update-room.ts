import { ClassTypeModel } from "../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";

export const updateRoom = async (
  _: unknown,
  {
    classTypeId,
    roomNumber,
    input,
  }: { classTypeId: string; roomNumber: number; input: any }
) => {
  try {
    const { roomNumber: newRoomNumber, maxStudents } = input;

    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new GraphQLError("ClassType not found");
    }

    // Find the room to update
    const roomIndex = classType.rooms.findIndex(
      (room) => room.roomNumber === roomNumber
    );
    if (roomIndex === -1) {
      throw new GraphQLError("Room not found in this ClassType");
    }

    // If updating room number, check if new number already exists
    if (newRoomNumber && newRoomNumber !== roomNumber) {
      const existingRoom = classType.rooms.find(
        (room) => room.roomNumber === newRoomNumber
      );
      if (existingRoom) {
        throw new GraphQLError(
          "New room number already exists in this ClassType"
        );
      }
    }

    // Update room
    if (newRoomNumber) {
      classType.rooms[roomIndex].roomNumber = newRoomNumber;
    }
    if (maxStudents !== undefined) {
      classType.rooms[roomIndex].maxStudents = maxStudents;
    }

    await classType.save();

    return transformDocument(classType);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
