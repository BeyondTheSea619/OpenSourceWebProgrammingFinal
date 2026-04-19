import {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from "../../application/use-cases/getAllEquipment";
import { IEquipmentRepository } from "../../domain/repositories/IEquipmentRepository";
import { Equipment } from "../../domain/entities/Equipment";

const mockEquipment: Equipment[] = [
  { id: "1", name: "Camera", category: "Electronics", status: "available" },
  { id: "2", name: "Tripod", category: "Accessories", status: "rented" },
];

const mockRepository: IEquipmentRepository = {
  findAll: jest.fn().mockResolvedValue(mockEquipment),
  findById: jest.fn().mockResolvedValue(mockEquipment[0]),
  create: jest.fn().mockResolvedValue(mockEquipment[0]),
  update: jest.fn().mockResolvedValue(mockEquipment[0]),
  delete: jest.fn().mockResolvedValue(true),
};

describe("Equipment Use Cases", () => {
  it("should return all equipment", async () => {
    const result = await getAllEquipment(mockRepository);
    expect(result).toEqual(mockEquipment);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it("should return equipment by id", async () => {
    const result = await getEquipmentById(mockRepository, "1");
    expect(result).toEqual(mockEquipment[0]);
    expect(mockRepository.findById).toHaveBeenCalledWith("1");
  });

  it("should create equipment", async () => {
    const result = await createEquipment(mockRepository, mockEquipment[0]);
    expect(result).toEqual(mockEquipment[0]);
    expect(mockRepository.create).toHaveBeenCalledWith(mockEquipment[0]);
  });

  it("should update equipment", async () => {
    const result = await updateEquipment(mockRepository, "1", {
      status: "rented",
    });
    expect(result).toEqual(mockEquipment[0]);
    expect(mockRepository.update).toHaveBeenCalledWith("1", {
      status: "rented",
    });
  });

  it("should delete equipment", async () => {
    const result = await deleteEquipment(mockRepository, "1");
    expect(result).toBe(true);
    expect(mockRepository.delete).toHaveBeenCalledWith("1");
  });
});
