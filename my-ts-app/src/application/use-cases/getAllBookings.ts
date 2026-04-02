import { Booking } from "../../domain/entities/Booking";

export function getAllBookings(): Booking[] {
  return [
    {
      id: 1,
      customerId: 1, // Ian Botsford
      equipmentId: 2,
      startDate: "2026-04-01",
      endDate: "2026-04-03",
      status: "approved",
    },
    {
      id: 2,
      customerId: 2, // Shivank Tyagi
      equipmentId: 1,
      startDate: "2026-04-05",
      endDate: "2026-04-06",
      status: "pending",
    },
    {
      id: 3,
      customerId: 3, // Kush Barot
      equipmentId: 3,
      startDate: "2026-04-10",
      endDate: "2026-04-12",
      status: "confirmed",
    },
  ];
}