import mongoose, { Schema, Document } from "mongoose";

export interface IBookingDocument extends Document {
  customerId: mongoose.Types.ObjectId;
  equipmentId: mongoose.Types.ObjectId;
  startDate: string;
  endDate: string;
  status: string;
}

const BookingSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  equipmentId: {
    type: Schema.Types.ObjectId,
    ref: "Equipment",
    required: true,
  },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending",
  },
});

export const BookingModel = mongoose.model<IBookingDocument>(
  "Booking",
  BookingSchema,
);
