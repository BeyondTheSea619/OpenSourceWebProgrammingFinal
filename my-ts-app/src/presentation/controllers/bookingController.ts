import { Request, Response } from "express";
import { getAllBookings } from "../../application/use-cases/getAllBookings";

export function getBookings(req: Request, res: Response): void {
  const bookings = getAllBookings();
  res.json(bookings);
}