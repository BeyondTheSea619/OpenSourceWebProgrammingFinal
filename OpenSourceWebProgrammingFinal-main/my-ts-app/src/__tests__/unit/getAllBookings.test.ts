import {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../../application/use-cases/getAllBookings";
import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { Booking } from "../../domain/entities/Booking";

const mockBookings: Booking[] = [
  {
    id: "1",
    customerId: "c1",
    equipmentId: "e1",
    startDate: "2026-04-01",
    endDate: "2026-04-03",
    status: "pending",
  },
  {
    id: "2",
    customerId: "c2",
    equipmentId: "e2",
    startDate: "2026-04-05",
    endDate: "2026-04-06",
    status: "approved",
  },
];

const mockRepository: IBookingRepository = {
  findAll: jest.fn().mockResolvedValue(mockBookings),
  findById: jest.fn().mockResolvedValue(mockBookings[0]),
  create: jest.fn().mockResolvedValue(mockBookings[0]),
  update: jest.fn().mockResolvedValue(mockBookings[0]),
  delete: jest.fn().mockResolvedValue(true),
};

describe("Booking Use Cases", () => {
  it("should return all bookings", async () => {
    const result = await getAllBookings(mockRepository);
    expect(result).toEqual(mockBookings);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });

  it("should return booking by id", async () => {
    const result = await getBookingById(mockRepository, "1");
    expect(result).toEqual(mockBookings[0]);
    expect(mockRepository.findById).toHaveBeenCalledWith("1");
  });

  it("should create a booking", async () => {
    const result = await createBooking(mockRepository, mockBookings[0]);
    expect(result).toEqual(mockBookings[0]);
    expect(mockRepository.create).toHaveBeenCalledWith(mockBookings[0]);
  });

  it("should update a booking", async () => {
    const result = await updateBooking(mockRepository, "1", {
      status: "approved",
    });
    expect(result).toEqual(mockBookings[0]);
    expect(mockRepository.update).toHaveBeenCalledWith("1", {
      status: "approved",
    });
  });

  it("should delete a booking", async () => {
    const result = await deleteBooking(mockRepository, "1");
    expect(result).toBe(true);
    expect(mockRepository.delete).toHaveBeenCalledWith("1");
  });
});
