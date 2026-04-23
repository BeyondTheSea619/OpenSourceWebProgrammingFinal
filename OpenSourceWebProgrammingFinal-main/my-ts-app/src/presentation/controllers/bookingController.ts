import { Request, Response } from "express";
import { BookingRepository } from "../../infrastructure/repositories/BookingRepository";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../../application/use-cases/getAllBookings";

const repository = new BookingRepository();

export async function getBookings(req: Request, res: Response): Promise<void> {
  try {
    const bookings = await getAllBookings(repository);
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getBookingByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const booking = await getBookingById(repository, req.params.id as string);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createBookingHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const booking = await createBooking(repository, req.body);
    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateBookingHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const booking = await updateBooking(
      repository,
      req.params.id as string,
      req.body,
    );
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }
    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteBookingHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const deleted = await deleteBooking(repository, req.params.id as string);
    if (!deleted) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
