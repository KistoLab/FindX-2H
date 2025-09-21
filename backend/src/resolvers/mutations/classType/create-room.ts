import { ClassTypeModel } from "../../../models";
import { GraphQLError } from "graphql";
import { transformDocument } from "@/lib/enumUtils";
import { assignStudentsToRoom } from "../../../utils/room-assignment";

export const createRoom = async (_: unknown, { input }: { input: any }) => {
  try {
    const { classTypeId, roomNumber, maxStudents } = input;

    // Check if ClassType exists
    const classType = await ClassTypeModel.findById(classTypeId);
    if (!classType) {
      throw new GraphQLError("ClassType not found");
    }

    // Check if room number already exists in this ClassType
    const existingRoom = classType.rooms.find(
      (room) => room.roomNumber === roomNumber
    );
    if (existingRoom) {
      throw new GraphQLError("Room number already exists in this ClassType");
    }

    // Add new room to ClassType
    classType.rooms.push({
      roomNumber,
      maxStudents,
      mandatNumbers: [],
    });

    await classType.save();

    // Automatically assign students to this room
    try {
      const assignedStudentIds = await assignStudentsToRoom(
        classTypeId,
        roomNumber
      );

      console.log(
        `🎯 Created room ${roomNumber} in ClassType ${classTypeId} and assigned ${assignedStudentIds.length} students`
      );
    } catch (assignmentError) {
      console.error("Error assigning students to room:", assignmentError);
      // Don't throw error here, room was created successfully
    }

    return transformDocument(classType);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
