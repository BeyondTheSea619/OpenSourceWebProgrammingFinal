import mongoose, { Schema, Document } from "mongoose";

export interface IEquipmentDocument extends Document {
  name: string;
  category: string;
  status: string;
}

const EquipmentSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true, default: "available" },
});

export const EquipmentModel = mongoose.model<IEquipmentDocument>(
  "Equipment",
  EquipmentSchema,
);
