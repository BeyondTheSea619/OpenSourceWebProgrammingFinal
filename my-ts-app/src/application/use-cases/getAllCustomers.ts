import { Customer } from "../../domain/entities/Customer";

export function getAllCustomers(): Customer[] {
  return [
    { id: 1, name: "Ian Botsford", email: "ian@gmail.com" },
    { id: 2, name: "Shivank Tyagi", email: "shivank@gmail.com" },
    { id: 3, name: "Kush Barot", email: "kush@gmail.com" },
  ];
}