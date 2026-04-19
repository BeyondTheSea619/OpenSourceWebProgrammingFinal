import { Equipment } from "../../domain/entities/Equipment";
import { IEquipmentRepository } from "../../domain/repositories/IEquipmentRepository";
import { EquipmentModel } from "../models/EquipmentModel";

export class EquipmentRepository implements IEquipmentRepository {
  async findAll(): Promise<Equipment[]> {
    const equipment = await EquipmentModel.find().lean();
    return equipment as unknown as Equipment[];
  }

  async findById(id: string): Promise<Equipment | null> {
    const equipment = await EquipmentModel.findById(id).lean();
    return equipment as unknown as Equipment | null;
  }

  async create(equipment: Equipment): Promise<Equipment> {
    const newEquipment = new EquipmentModel(equipment);
    const saved = await newEquipment.save();
    return saved as unknown as Equipment;
  }

  async update(
    id: string,
    equipment: Partial<Equipment>,
  ): Promise<Equipment | null> {
    const updated = await EquipmentModel.findByIdAndUpdate(id, equipment, {
      new: true,
    }).lean();
    return updated as unknown as Equipment | null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await EquipmentModel.findByIdAndDelete(id);
    return result !== null;
  }
}
