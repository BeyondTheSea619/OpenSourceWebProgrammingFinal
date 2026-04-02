import { Router } from "express";
import { getEquipment } from "../controllers/equipmentController";

const router = Router();

router.get("/", getEquipment);

export default router;