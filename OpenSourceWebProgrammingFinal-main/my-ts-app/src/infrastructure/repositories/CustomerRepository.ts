import { Customer } from "../../domain/entities/Customer";
import { ICustomerRepository } from "../../domain/repositories/ICustomerRepository";
import { CustomerModel } from "../models/CustomerModel";

export class CustomerRepository implements ICustomerRepository {
  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.find().lean();
    return customers as unknown as Customer[];
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await CustomerModel.findById(id).lean();
    return customer as unknown as Customer | null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await CustomerModel.findOne({ email }).lean();
    return customer as unknown as Customer | null;
  }

  async create(customer: Customer): Promise<Customer> {
    const newCustomer = new CustomerModel(customer);
    const saved = await newCustomer.save();
    return saved as unknown as Customer;
  }

  async update(
    id: string,
    customer: Partial<Customer>,
  ): Promise<Customer | null> {
    const updated = await CustomerModel.findByIdAndUpdate(id, customer, {
      new: true,
    }).lean();
    return updated as unknown as Customer | null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CustomerModel.findByIdAndDelete(id);
    return result !== null;
  }
}
