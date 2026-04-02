import { CustomerBooking } from "../../domain/entities/CustomerBooking";

export function getAllCustomerBookings(): CustomerBooking[] {
  return [
    {
      bookingId: 1,
      customerName: "Ian Botsford",
      equipmentName: "Tripod",
      startDate: "2026-04-01",
      endDate: "2026-04-03",
      status: "approved",
    },
    {
      bookingId: 2,
      customerName: "Shivank Tyagi",
      equipmentName: "Camera",
      startDate: "2026-04-05",
      endDate: "2026-04-06",
      status: "pending",
    },
    {
      bookingId: 3,
      customerName: "Kush Barot",
      equipmentName: "Lighting Kit",
      startDate: "2026-04-10",
      endDate: "2026-04-12",
      status: "confirmed",
    },
  ];
}