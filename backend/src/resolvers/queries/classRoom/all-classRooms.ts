import { ClassRoomModel } from "@/models/ClassRoom.model";
import { transformDocument } from "@/lib/enumUtils";

export const allClassRooms = async () => {
  try {
    const classRooms = await ClassRoomModel.find();
    return classRooms.map(transformDocument);
  } catch (error) {
    console.error("Error fetching class rooms:", error);
    throw new Error("Failed to fetch class rooms");
  }
};
