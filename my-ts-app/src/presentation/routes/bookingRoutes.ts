import { Router } from "express";
import {
  getBookings,
  getBookingByIdHandler,
  createBookingHandler,
  updateBookingHandler,
  deleteBookingHandler,
} from "../controllers/bookingController";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getBookings);
router.get("/:id", authenticateToken, getBookingByIdHandler);
router.post("/", authenticateToken, createBookingHandler);
router.put("/:id", authenticateToken, authorizeAdmin, updateBookingHandler);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteBookingHandler);

export default router;
