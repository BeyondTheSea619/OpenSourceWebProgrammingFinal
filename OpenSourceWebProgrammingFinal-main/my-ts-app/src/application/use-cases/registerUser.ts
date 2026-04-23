import bcrypt from "bcryptjs";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { Customer } from "../../domain/entities/Customer";

export async function registerUser(
  repository: ICustomerRepository,
  name: string,
  email: string,
  password: string,
  role: string = "user",
): Promise<Customer> {
  const existing = await repository.findByEmail(email);
  if (existing) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const customer: Customer = { name, email, password: hashedPassword, role };
  return await repository.create(customer);
}
