import { Request, Response } from "express";
import { EquipmentRepository } from "../../infrastructure/repositories/EquipmentRepository";
import {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../../application/use-cases/getAllEquipment";

const repository = new EquipmentRepository();

export async function getEquipment(req: Request, res: Response): Promise<void> {
  try {
    const equipment = await getAllEquipment(repository);
    res.json(equipment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getEquipmentByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const equipment = await getEquipmentById(
      repository,
      req.params.id as string,
    );
    if (!equipment) {
      res.status(404).json({ message: "Equipment not found" });
      return;
    }
    res.json(equipment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createEquipmentHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const equipment = await createEquipment(repository, req.body);
    res.status(201).json(equipment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateEquipmentHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const equipment = await updateEquipment(
      repository,
      req.params.id as string,
      req.body,
    );
    if (!equipment) {
      res.status(404).json({ message: "Equipment not found" });
      return;
    }
    res.json(equipment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteEquipmentHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const deleted = await deleteEquipment(repository, req.params.id as string);
    if (!deleted) {
      res.status(404).json({ message: "Equipment not found" });
      return;
    }
    res.json({ message: "Equipment deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
