import { Router } from "express";
import {
  getCustomers,
  getCustomerByIdHandler,
  updateCustomerHandler,
  deleteCustomerHandler,
} from "../controllers/customerController";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, authorizeAdmin, getCustomers);
router.get("/:id", authenticateToken, getCustomerByIdHandler);
router.put("/:id", authenticateToken, updateCustomerHandler);
router.delete("/:id", authenticateToken, authorizeAdmin, deleteCustomerHandler);

export default router;
