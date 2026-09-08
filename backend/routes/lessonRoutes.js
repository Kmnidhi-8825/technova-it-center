import express from "express"
import { getLessons,createLesson ,updateLesson , deleteLesson} from "../controllers/lessonController.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js";


const router=express.Router()

//Get all Lessons of a course
router.get("/:courseId",getLessons)

//create lesson
router.post("/", protect, adminOnly,createLesson)


//update lesson
router.put("/:id",  protect, adminOnly,updateLesson);

//Delete lesson
router.delete("/:id", protect, adminOnly,deleteLesson);
export default router