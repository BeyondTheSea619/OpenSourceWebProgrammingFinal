import { Equipment } from "../entities/Equipment";

export interface IEquipmentRepository {
  findAll(): Promise<Equipment[]>;
  findById(id: string): Promise<Equipment | null>;
  create(equipment: Equipment): Promise<Equipment>;
  update(id: string, equipment: Partial<Equipment>): Promise<Equipment | null>;
  delete(id: string): Promise<boolean>;
}
