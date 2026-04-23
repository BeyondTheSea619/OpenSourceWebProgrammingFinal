import { Booking } from "../../domain/entities/Booking";
import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { BookingModel } from "../models/BookingModel";

export class BookingRepository implements IBookingRepository {
  async findAll(): Promise<Booking[]> {
    const bookings = await BookingModel.find()
      .populate("customerId")
      .populate("equipmentId")
      .lean();
    return bookings as unknown as Booking[];
  }

  async findById(id: string): Promise<Booking | null> {
    const booking = await BookingModel.findById(id)
      .populate("customerId")
      .populate("equipmentId")
      .lean();
    return booking as unknown as Booking | null;
  }

  async create(booking: Booking): Promise<Booking> {
    const newBooking = new BookingModel(booking);
    const saved = await newBooking.save();
    return saved as unknown as Booking;
  }

  async update(id: string, booking: Partial<Booking>): Promise<Booking | null> {
    const updated = await BookingModel.findByIdAndUpdate(id, booking, {
      new: true,
    }).lean();
    return updated as unknown as Booking | null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await BookingModel.findByIdAndDelete(id);
    return result !== null;
  }
}
