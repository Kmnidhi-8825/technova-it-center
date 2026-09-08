import express from "express";
import {
  getCertificate,
  verifyCertificate,
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// IMPORTANT: public verification route
router.get("/verify/:certificateId", verifyCertificate);

// Get certificate for logged-in student
router.get("/:courseId", protect, getCertificate);

export default router;