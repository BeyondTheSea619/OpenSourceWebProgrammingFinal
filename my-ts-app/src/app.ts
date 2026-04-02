import express from "express";
import equipmentRoutes from "./presentation/routes/equipmentRoutes";
import customerRoutes from "./presentation/routes/customerRoutes";
import bookingRoutes from "./presentation/routes/bookingRoutes";
import customerBookingRoutes from "./presentation/routes/customerBookingRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Equipment Rental Booking System API is running",
  });
});

app.use("/equipment", equipmentRoutes);
app.use("/customers", customerRoutes);
app.use("/bookings", bookingRoutes);
app.use("/customer-bookings", customerBookingRoutes);

export default app;
