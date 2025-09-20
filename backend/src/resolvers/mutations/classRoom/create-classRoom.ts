import { ClassRoomModel } from "@/models/ClassRoom.model";
import { transformDocument } from "@/lib/enumUtils";

export const createClassRoom = async (_: any, { input }: any) => {
  try {
    const classRoom = new ClassRoomModel({
      roomNumber: input.roomNumber,
      mandatNumber: [], // Initially empty, will be populated when students register
    });

    const savedClassRoom = await classRoom.save();
    return transformDocument(savedClassRoom);
  } catch (error) {
    console.error("Error creating class room:", error);
    throw new Error("Failed to create class room");
  }
};
