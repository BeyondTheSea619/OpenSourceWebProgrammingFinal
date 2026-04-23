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
router.post("/", createBookingHandler); // guests can book without auth
router.put("/:id", authenticateToken, authorizeAdmin, updateBookingHandler);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteBookingHandler);

export default router;
