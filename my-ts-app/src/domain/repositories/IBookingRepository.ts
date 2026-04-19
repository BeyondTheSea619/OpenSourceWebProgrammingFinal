import { Booking } from "../entities/Booking";

export interface IBookingRepository {
  findAll(): Promise<Booking[]>;
  findById(id: string): Promise<Booking | null>;
  create(booking: Booking): Promise<Booking>;
  update(id: string, booking: Partial<Booking>): Promise<Booking | null>;
  delete(id: string): Promise<boolean>;
}
