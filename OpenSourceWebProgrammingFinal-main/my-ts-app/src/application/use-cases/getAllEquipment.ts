import { Equipment } from "../../domain/entities/Equipment";
import { IEquipmentRepository } from "../../domain/repositories/IEquipmentRepository";

export async function getAllEquipment(
  repository: IEquipmentRepository,
): Promise<Equipment[]> {
  return await repository.findAll();
}

export async function getEquipmentById(
  repository: IEquipmentRepository,
  id: string,
): Promise<Equipment | null> {
  return await repository.findById(id);
}

export async function createEquipment(
  repository: IEquipmentRepository,
  data: Equipment,
): Promise<Equipment> {
  return await repository.create(data);
}

export async function updateEquipment(
  repository: IEquipmentRepository,
  id: string,
  data: Partial<Equipment>,
): Promise<Equipment | null> {
  return await repository.update(id, data);
}

export async function deleteEquipment(
  repository: IEquipmentRepository,
  id: string,
): Promise<boolean> {
  return await repository.delete(id);
}
