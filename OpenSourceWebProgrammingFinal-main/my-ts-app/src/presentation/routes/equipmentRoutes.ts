import { Router } from "express";
import {
  getEquipment,
  getEquipmentByIdHandler,
  createEquipmentHandler,
  updateEquipmentHandler,
  deleteEquipmentHandler,
} from "../controllers/equipmentController";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getEquipment);
router.get("/:id", authenticateToken, getEquipmentByIdHandler);
router.post("/", authenticateToken, authorizeAdmin, createEquipmentHandler);
router.put("/:id", authenticateToken, authorizeAdmin, updateEquipmentHandler);
router.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  deleteEquipmentHandler,
);

export default router;
