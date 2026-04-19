import express from "express";
import equipmentRoutes from "./presentation/routes/equipmentRoutes";
import customerRoutes from "./presentation/routes/customerRoutes";
import bookingRoutes from "./presentation/routes/bookingRoutes";
import authRoutes from "./presentation/routes/authRoutes";
import { loggerMiddleware } from "./presentation/middleware/loggerMiddleware";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "Equipment Rental Booking System API is running",
  });
});

app.use("/auth", authRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/customers", customerRoutes);
app.use("/bookings", bookingRoutes);

export default app;
