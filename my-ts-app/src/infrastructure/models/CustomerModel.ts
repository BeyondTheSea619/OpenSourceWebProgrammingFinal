import mongoose, { Schema, Document } from "mongoose";

export interface ICustomerDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const CustomerModel = mongoose.model<ICustomerDocument>(
  "Customer",
  CustomerSchema,
);
