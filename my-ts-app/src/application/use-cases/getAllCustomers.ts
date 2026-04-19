import { Customer } from "../../domain/entities/Customer";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";

export async function getAllCustomers(
  repository: ICustomerRepository,
): Promise<Customer[]> {
  return await repository.findAll();
}

export async function getCustomerById(
  repository: ICustomerRepository,
  id: string,
): Promise<Customer | null> {
  return await repository.findById(id);
}

export async function updateCustomer(
  repository: ICustomerRepository,
  id: string,
  data: Partial<Customer>,
): Promise<Customer | null> {
  return await repository.update(id, data);
}

export async function deleteCustomer(
  repository: ICustomerRepository,
  id: string,
): Promise<boolean> {
  return await repository.delete(id);
}
