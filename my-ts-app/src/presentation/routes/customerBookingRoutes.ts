import { Router } from "express";
import { getCustomerBookings } from "../controllers/customerBookingController";

const router = Router();

router.get("/", getCustomerBookings);

export default router;