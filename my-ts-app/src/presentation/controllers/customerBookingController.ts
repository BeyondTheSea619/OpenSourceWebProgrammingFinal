import { Request, Response } from "express";
import { getAllCustomerBookings } from "../../application/use-cases/getAllCustomerBookings";

export function getCustomerBookings(req: Request, res: Response): void {
  const customerBookings = getAllCustomerBookings();
  res.json(customerBookings);
}