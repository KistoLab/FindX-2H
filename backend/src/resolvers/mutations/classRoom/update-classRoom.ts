import { ClassRoomModel } from "@/models/ClassRoom.model";
import { transformDocument } from "@/lib/enumUtils";

export const updateClassRoom = async (_: any, { id, input }: any) => {
  try {
    const classRoom = await ClassRoomModel.findByIdAndUpdate(
      id,
      { roomNumber: input.roomNumber },
      { new: true }
    );

    if (!classRoom) {
      throw new Error("Class room not found");
    }

    return transformDocument(classRoom);
  } catch (error) {
    console.error("Error updating class room:", error);
    throw new Error("Failed to update class room");
  }
};
