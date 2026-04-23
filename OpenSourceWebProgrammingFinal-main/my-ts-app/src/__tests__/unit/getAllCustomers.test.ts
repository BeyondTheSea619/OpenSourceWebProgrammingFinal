import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../../application/use-cases/getAllCustomers";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { Customer } from "../../domain/entities/Customer";

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Ian Botsford",
    email: "ian@gmail.com",
    password: "hashed1",
    role: "user",
  },
  {
    id: "2",
    name: "Shivank Tyagi",
    email: "shivank@gmail.com",
    password: "hashed2",
    role: "admin",
  },
];

const mockRepository: ICustomerRepository = {
  findAll: jest.fn().mockResolvedValue(mockCustomers),
  findById: jest.fn().mockResolvedValue(mockCustomers[0]),
  findByEmail: jest.fn().mockResolvedValue(mockCustomers[0]),
  create: jest.fn().mockResolvedValue(mockCustomers[0]),
  update: jest.fn().mockResolvedValue(mockCustomers[0]),
  delete: jest.fn().mockResolvedValue(true),
};

describe("Customer Use Cases", () => {
  it("should return all customers", async () => {
    const result = await getAllCustomers(mockRepository);
    expect(result).toEqual(mockCustomers);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it("should return customer by id", async () => {
    const result = await getCustomerById(mockRepository, "1");
    expect(result).toEqual(mockCustomers[0]);
    expect(mockRepository.findById).toHaveBeenCalledWith("1");
  });

  it("should update a customer", async () => {
    const result = await updateCustomer(mockRepository, "1", {
      name: "Updated Name",
    });
    expect(result).toEqual(mockCustomers[0]);
    expect(mockRepository.update).toHaveBeenCalledWith("1", {
      name: "Updated Name",
    });
  });

  it("should delete a customer", async () => {
    const result = await deleteCustomer(mockRepository, "1");
    expect(result).toBe(true);
    expect(mockRepository.delete).toHaveBeenCalledWith("1");
  });
});
