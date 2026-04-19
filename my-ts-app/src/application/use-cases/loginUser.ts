import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";

export async function loginUser(
  repository: ICustomerRepository,
  email: string,
  password: string,
): Promise<string> {
  const customer = await repository.findByEmail(email);
  if (!customer) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ id: customer.id, role: customer.role }, secret, {
    expiresIn: "24h",
  });

  return token;
}
