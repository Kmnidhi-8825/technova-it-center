import mongoose from "mongoose";
const lessonSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
