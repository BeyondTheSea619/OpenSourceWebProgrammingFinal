import { Booking } from "../../domain/entities/Booking";
import { IBookingRepository } from "../../domain/repositories/IBookingRepository";

export async function getAllBookings(
  repository: IBookingRepository,
): Promise<Booking[]> {
  return await repository.findAll();
}

export async function getBookingById(
  repository: IBookingRepository,
  id: string,
): Promise<Booking | null> {
  return await repository.findById(id);
}

export async function createBooking(
  repository: IBookingRepository,
  data: Booking,
): Promise<Booking> {
  return await repository.create(data);
}

export async function updateBooking(
  repository: IBookingRepository,
  id: string,
  data: Partial<Booking>,
): Promise<Booking | null> {
  return await repository.update(id, data);
}

export async function deleteBooking(
  repository: IBookingRepository,
  id: string,
): Promise<boolean> {
  return await repository.delete(id);
}
