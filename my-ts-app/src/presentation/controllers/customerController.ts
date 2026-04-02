import { Request, Response } from "express";
import { getAllCustomers } from "../../application/use-cases/getAllCustomers";

export function getCustomers(req: Request, res: Response): void {
  const customers = getAllCustomers();
  res.json(customers);
}