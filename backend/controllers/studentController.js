import Enrollment from "../models/Enrollment.js";
import Progress from "../models/Progress.js";
import Lesson from "../models/Lesson.js";

// Student Dashboard
export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get student's enrolled courses
    const enrollments = await Enrollment.find({
      user: userId,
    }).populate("course");

    const dashboardCourses = await Promise.all(
      enrollments.map(async (enrollment) => {
        const course = enrollment.course;

        // Get total lessons of this course
        const totalLessons = await Lesson.countDocuments({
          course: course._id,
        });

        // Get student's progress for this course
        const progress = await Progress.findOne({
          student: userId,
          course: course._id,
        });

        const completedLessons = progress?.completedLessons?.length || 0;

        // Calculate percentage
        const percentage =
          totalLessons > 0
            ? Math.min(100, Math.round((completedLessons / totalLessons) * 100))
            : 0;

        return {
          course,
          totalLessons,
          completedLessons,
          percentage,
        };
      }),
    );

    res.status(200).json({
      courses: dashboardCourses,
    });
  } catch (error) {
    console.log("Student Dashboard Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
