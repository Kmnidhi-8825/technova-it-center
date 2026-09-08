import express from "express";
import { getCourses, getCourseById, createCourse, deleteCourse, updateCourse,} from "../controllers/courseController.js";
import { protect , adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/",protect , adminOnly , createCourse);
router.put("/:id", protect , adminOnly ,updateCourse);
router.delete("/:id", protect , adminOnly , deleteCourse);

export default router;