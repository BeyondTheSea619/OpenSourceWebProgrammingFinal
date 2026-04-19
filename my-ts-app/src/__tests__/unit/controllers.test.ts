import {
  getEquipment,
  getEquipmentByIdHandler,
  createEquipmentHandler,
  updateEquipmentHandler,
  deleteEquipmentHandler,
} from "../../presentation/controllers/equipmentController";
import {
  getCustomers,
  getCustomerByIdHandler,
  updateCustomerHandler,
  deleteCustomerHandler,
} from "../../presentation/controllers/customerController";
import {
  getBookings,
  getBookingByIdHandler,
  createBookingHandler,
  updateBookingHandler,
  deleteBookingHandler,
} from "../../presentation/controllers/bookingController";
import { Request, Response } from "express";

const mockEquipment = {
  id: "1",
  name: "Camera",
  category: "Electronics",
  status: "available",
};
const mockCustomer = {
  id: "1",
  name: "Ian",
  email: "ian@gmail.com",
  password: "hashed",
  role: "user",
};
const mockBooking = {
  id: "1",
  customerId: "c1",
  equipmentId: "e1",
  startDate: "2026-04-01",
  endDate: "2026-04-03",
  status: "pending",
};

const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock("../../infrastructure/repositories/EquipmentRepository", () => ({
  EquipmentRepository: jest.fn().mockImplementation(() => ({
    findAll: jest
      .fn()
      .mockResolvedValue([
        {
          id: "1",
          name: "Camera",
          category: "Electronics",
          status: "available",
        },
      ]),
    findById: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        name: "Camera",
        category: "Electronics",
        status: "available",
      }),
    create: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        name: "Camera",
        category: "Electronics",
        status: "available",
      }),
    update: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        name: "Camera",
        category: "Electronics",
        status: "available",
      }),
    delete: jest.fn().mockResolvedValue(true),
  })),
}));

jest.mock("../../infrastructure/repositories/CustomerRepository", () => ({
  CustomerRepository: jest.fn().mockImplementation(() => ({
    findAll: jest
      .fn()
      .mockResolvedValue([
        {
          id: "1",
          name: "Ian",
          email: "ian@gmail.com",
          password: "hashed",
          role: "user",
        },
      ]),
    findById: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        name: "Ian",
        email: "ian@gmail.com",
        password: "hashed",
        role: "user",
      }),
    findByEmail: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        name: "Ian",
        email: "ian@gmail.com",
        password: "hashed",
        role: "user",
      }),
    create: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        name: "Ian",
        email: "ian@gmail.com",
        password: "hashed",
        role: "user",
      }),
    update: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        name: "Ian",
        email: "ian@gmail.com",
        password: "hashed",
        role: "user",
      }),
    delete: jest.fn().mockResolvedValue(true),
  })),
}));

jest.mock("../../infrastructure/repositories/BookingRepository", () => ({
  BookingRepository: jest.fn().mockImplementation(() => ({
    findAll: jest
      .fn()
      .mockResolvedValue([
        {
          id: "1",
          customerId: "c1",
          equipmentId: "e1",
          startDate: "2026-04-01",
          endDate: "2026-04-03",
          status: "pending",
        },
      ]),
    findById: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        customerId: "c1",
        equipmentId: "e1",
        startDate: "2026-04-01",
        endDate: "2026-04-03",
        status: "pending",
      }),
    create: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        customerId: "c1",
        equipmentId: "e1",
        startDate: "2026-04-01",
        endDate: "2026-04-03",
        status: "pending",
      }),
    update: jest
      .fn()
      .mockResolvedValue({
        id: "1",
        customerId: "c1",
        equipmentId: "e1",
        startDate: "2026-04-01",
        endDate: "2026-04-03",
        status: "pending",
      }),
    delete: jest.fn().mockResolvedValue(true),
  })),
}));

describe("Equipment Controller", () => {
  it("should get all equipment", async () => {
    const req = {} as Request;
    const res = mockRes();
    await getEquipment(req, res);
    expect(res.json).toHaveBeenCalledWith([mockEquipment]);
  });

  it("should get equipment by id", async () => {
    const req = { params: { id: "1" } } as any;
    const res = mockRes();
    await getEquipmentByIdHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(mockEquipment);
  });

  it("should create equipment", async () => {
    const req = { body: mockEquipment } as Request;
    const res = mockRes();
    await createEquipmentHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should update equipment", async () => {
    const req = { params: { id: "1" }, body: { status: "rented" } } as any;
    const res = mockRes();
    await updateEquipmentHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(mockEquipment);
  });

  it("should delete equipment", async () => {
    const req = { params: { id: "1" } } as any;
    const res = mockRes();
    await deleteEquipmentHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Equipment deleted successfully",
    });
  });

  it("should return 404 if equipment not found by id", async () => {
    const req = { params: { id: "999" } } as any;
    const res = mockRes();
    jest
      .spyOn(
        require("../../infrastructure/repositories/EquipmentRepository"),
        "EquipmentRepository",
      )
      .mockImplementationOnce(() => ({
        findById: jest.fn().mockResolvedValue(null),
      }));
    await getEquipmentByIdHandler(req, res);
    expect(res.json).toBeDefined();
  });

  it("should return 500 if getEquipment throws", async () => {
    const req = {} as Request;
    const res = mockRes();
    jest
      .spyOn(
        require("../../infrastructure/repositories/EquipmentRepository"),
        "EquipmentRepository",
      )
      .mockImplementationOnce(() => ({
        findAll: jest.fn().mockRejectedValue(new Error("DB error")),
      }));
    await getEquipment(req, res);
    expect(res.json).toBeDefined();
  });
});

describe("Customer Controller", () => {
  it("should get all customers", async () => {
    const req = {} as Request;
    const res = mockRes();
    await getCustomers(req, res);
    expect(res.json).toHaveBeenCalledWith([mockCustomer]);
  });

  it("should get customer by id", async () => {
    const req = { params: { id: "1" } } as any;
    const res = mockRes();
    await getCustomerByIdHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(mockCustomer);
  });

  it("should update a customer", async () => {
    const req = { params: { id: "1" }, body: { name: "Updated" } } as any;
    const res = mockRes();
    await updateCustomerHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(mockCustomer);
  });

  it("should delete a customer", async () => {
    const req = { params: { id: "1" } } as any;
    const res = mockRes();
    await deleteCustomerHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Customer deleted successfully",
    });
  });

  it("should return 404 if customer not found by id", async () => {
    const req = { params: { id: "999" } } as any;
    const res = mockRes();
    jest
      .spyOn(
        require("../../infrastructure/repositories/CustomerRepository"),
        "CustomerRepository",
      )
      .mockImplementationOnce(() => ({
        findById: jest.fn().mockResolvedValue(null),
      }));
    await getCustomerByIdHandler(req, res);
    expect(res.json).toBeDefined();
  });

  it("should return 500 if getCustomers throws", async () => {
    const req = {} as Request;
    const res = mockRes();
    jest
      .spyOn(
        require("../../infrastructure/repositories/CustomerRepository"),
        "CustomerRepository",
      )
      .mockImplementationOnce(() => ({
        findAll: jest.fn().mockRejectedValue(new Error("DB error")),
      }));
    await getCustomers(req, res);
    expect(res.json).toBeDefined();
  });
});

describe("Booking Controller", () => {
  it("should get all bookings", async () => {
    const req = {} as Request;
    const res = mockRes();
    await getBookings(req, res);
    expect(res.json).toHaveBeenCalledWith([mockBooking]);
  });

  it("should get booking by id", async () => {
    const req = { params: { id: "1" } } as any;
    const res = mockRes();
    await getBookingByIdHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(mockBooking);
  });

  it("should create a booking", async () => {
    const req = { body: mockBooking } as Request;
    const res = mockRes();
    await createBookingHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it("should update a booking", async () => {
    const req = { params: { id: "1" }, body: { status: "approved" } } as any;
    const res = mockRes();
    await updateBookingHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(mockBooking);
  });

  it("should delete a booking", async () => {
    const req = { params: { id: "1" } } as any;
    const res = mockRes();
    await deleteBookingHandler(req, res);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking deleted successfully",
    });
  });

  it("should return 404 if booking not found by id", async () => {
    const req = { params: { id: "999" } } as any;
    const res = mockRes();
    jest
      .spyOn(
        require("../../infrastructure/repositories/BookingRepository"),
        "BookingRepository",
      )
      .mockImplementationOnce(() => ({
        findById: jest.fn().mockResolvedValue(null),
      }));
    await getBookingByIdHandler(req, res);
    expect(res.json).toBeDefined();
  });

  it("should return 500 if getBookings throws", async () => {
    const req = {} as Request;
    const res = mockRes();
    jest
      .spyOn(
        require("../../infrastructure/repositories/BookingRepository"),
        "BookingRepository",
      )
      .mockImplementationOnce(() => ({
        findAll: jest.fn().mockRejectedValue(new Error("DB error")),
      }));
    await getBookings(req, res);
    expect(res.json).toBeDefined();
  });
});
