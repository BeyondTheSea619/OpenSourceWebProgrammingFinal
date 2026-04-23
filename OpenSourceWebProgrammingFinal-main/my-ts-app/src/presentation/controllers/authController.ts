import { Request, Response } from "express";
import { CustomerRepository } from "../../infrastructure/repositories/CustomerRepository";
import { registerUser } from "../../application/use-cases/registerUser";
import { loginUser } from "../../application/use-cases/loginUser";

const customerRepository = new CustomerRepository();

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, role } = req.body;
    const customer = await registerUser(
      customerRepository,
      name,
      email,
      password,
      role,
    );
    res.status(201).json({ message: "User registered successfully", customer });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const token = await loginUser(customerRepository, email, password);
    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
