import {  useEffect, useState  } from "react";

export const LessonForm = ({ onSubmit, courses = [], editingLesson, }) => {

  console.log("LessonForm courses:" , courses);
  
  const [formData, setFormData] = useState({
    course: "",
    title: "",
    videoUrl: "",
    duration: "",
    order: 1,
  });

  useEffect(()=>{
    if (editingLesson) {
      setFormData({
        course:editingLesson.course,
        title:editingLesson.title,
        videoUrl:editingLesson.videoUrl,
        duration:editingLesson.duration,
        order:editingLesson.order,
      });
    }

  },[editingLesson]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      course: "",
      title: "",
      videoUrl: "",
      duration: "",
      order: 1,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-6 rounded-2xl space-y-4"
    >
      <h2 className="text-2xl font-bold">
        Add Lesson
      </h2>

      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800"
        required
      >
        <option value="">Select Course</option>

        {courses.map((course) => (
          <option
            key={course._id}
            value={course._id}
          >
            {course.title}
          </option>
        ))}
      </select>

      <input
        name="title"
        placeholder="Lesson Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        name="videoUrl"
        placeholder="Video URL"
        value={formData.videoUrl}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        name="duration"
        placeholder="Duration"
        value={formData.duration}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <input
        type="number"
        name="order"
        placeholder="Lesson Order"
        value={formData.order}
        onChange={handleChange}
        className="w-full p-3 rounded bg-slate-800"
        required
      />

      <button
        type="submit"
        className="w-full bg-cyan-500 py-3 rounded-xl font-semibold hover:bg-cyan-600"
      >
        {editingLesson ? "Update Lesson" : "Add Lesson"}
      </button>
    </form>
  );
};