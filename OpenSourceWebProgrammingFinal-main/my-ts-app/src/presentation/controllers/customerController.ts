import { Request, Response } from "express";
import { CustomerRepository } from "../../infrastructure/repositories/CustomerRepository";
import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../../application/use-cases/getAllCustomers";

const repository = new CustomerRepository();

export async function getCustomers(req: Request, res: Response): Promise<void> {
  try {
    const customers = await getAllCustomers(repository);
    res.json(customers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCustomerByIdHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const customer = await getCustomerById(repository, req.params.id as string);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateCustomerHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const customer = await updateCustomer(
      repository,
      req.params.id as string,
      req.body,
    );
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCustomerHandler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const deleted = await deleteCustomer(repository, req.params.id as string);
    if (!deleted) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
