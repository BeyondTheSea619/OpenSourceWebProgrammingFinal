import { Request, Response } from "express";
import { getAllEquipment } from "../../application/use-cases/getAllEquipment";

export function getEquipment(req: Request, res: Response): void {
  const equipment = getAllEquipment();
  res.json(equipment);
}