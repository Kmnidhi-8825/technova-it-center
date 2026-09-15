import express from "express"
import { getAdminDashboard , getAllUsers  } from "../controllers/adminController.js";
import {protect,adminOnly} from "../middleware/authMiddleware.js"

const router=express.Router();
router.get("/dashboard",protect,adminOnly,getAdminDashboard)
router.get("/users", protect, adminOnly, getAllUsers);
export default router;