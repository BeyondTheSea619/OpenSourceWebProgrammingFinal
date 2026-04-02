import { Equipment } from "../../domain/entities/Equipment";

export function getAllEquipment(): Equipment[] {
  return [
    { id: 1, name: "Camera", category: "Electronics", status: "available" },
    { id: 2, name: "Tripod", category: "Accessories", status: "rented" },
    { id: 3, name: "Projector", category: "Electronics", status: "available" },
  ];
}