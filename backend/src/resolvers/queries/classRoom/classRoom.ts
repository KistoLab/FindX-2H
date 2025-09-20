import { ClassRoomModel } from "@/models/ClassRoom.model";
import { transformDocument } from "@/lib/enumUtils";

export const classRoom = async (_: any, { id }: any) => {
  try {
    const classRoom = await ClassRoomModel.findById(id);
    if (!classRoom) {
      throw new Error("Class room not found");
    }
    return transformDocument(classRoom);
  } catch (error) {
    console.error("Error fetching class room:", error);
    throw new Error("Failed to fetch class room");
  }
};
