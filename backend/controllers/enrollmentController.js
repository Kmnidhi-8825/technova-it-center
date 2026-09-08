import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

// Enroll in a Course
export const enrollCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "You are already enrolled in this course.",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    res.status(201).json({
      message: "Enrollment successful.",
      enrollment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get my enrolled courses
export const getMyCourses=async(req,res)=>{
  try {
    const enrollments=await Enrollment.find({
      user:req.user.id,
    }).populate("course");
    res.status(200).json(enrollments)
  } catch (error) {
   res.status(500).json({ message:error.message,})  
  }
}