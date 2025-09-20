import { Model, model, models, Schema } from "mongoose";

type ClassRoomSchemaType = {
  id: string;
  roomNumber: string;
  mandatNumber: [string];
};

const classRoomSchema = new Schema<ClassRoomSchemaType>(
  {
    roomNumber: { type: String, required: true },
    mandatNumber: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export const ClassRoomModel: Model<ClassRoomSchemaType> =
  models["ClassRoom"] || model("ClassRoom", classRoomSchema);