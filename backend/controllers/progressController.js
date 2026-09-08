import Progress from "../models/Progress.js";
import Certificate from "../models/Certificate.js";
import Lesson from "../models/Lesson.js"

export const completeLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    // Same ID format everywhere
    const studentId = req.user.id;

    let progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        student: studentId,
        course: courseId,
        completedLessons: [lessonId],
      });
    } else {

      // ObjectId comparison
      const alreadyCompleted = progress.completedLessons.some(
        (id) => id.toString() === lessonId.toString()
      );

      if (!alreadyCompleted) {
        progress.completedLessons.push(lessonId);
        await progress.save();
      }
    }

    // Get total lessons in this course
const totalLessons = await Lesson.countDocuments({
  course: courseId,
});

// Check if all lessons are completed
if (
  totalLessons > 0 &&
  progress.completedLessons.length === totalLessons
) {
  // Check if certificate already exists
  const existingCertificate = await Certificate.findOne({
    student: studentId,
    course: courseId,
  });

  // Create certificate only once
  if (!existingCertificate) {
    const certificateId = `CERT-${Date.now()}-${studentId
      .toString()
      .slice(-6)}`;

    await Certificate.create({
      student: studentId,
      course: courseId,
      certificateId,
    });
  }
}
    res.status(200).json({
      message: "Lesson marked as completed",
      progress,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET STUDENT PROGRESS

export const getProgress = async (req, res) => {
  try {
    // IMPORTANT: same as completeLesson
    const studentId = req.user.id;

    const { courseId } = req.params;

    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    res.status(200).json({
      progress,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};