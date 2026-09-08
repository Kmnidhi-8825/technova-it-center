import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Loading } from "../components/Loading";
import { CourseForm } from "../components/admin/CourseForm";
import { LessonForm } from "../components/LessonForm";

export const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [editingLesson, setEditingLesson] = useState(null);
  const navigate = useNavigate();
const { logout } = useAuth();

const handleLogout = () => {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  logout();
  navigate("/login");
};
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "",
    duration: "",
    price: "",
    image: "",
    featured: false,
  });

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      console.log("Courses API response:", res.data);
      const courseData = Array.isArray(res.data)
        ? res.data
        : res.data.courses || [];
      setCourses(courseData);
      console.log("Courses set : ", courseData);
    } catch (error) {
      console.log("Fetch Courses Error :", error);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      if (!courseId) {
        setLessons([]);
        return;
      }

      const res = await api.get(`/lessons/${courseId}`);
      console.log("Lessons : ", res.data);

      setLessons(res.data);
    } catch (error) {
      console.log("Fetch Lessons Error : ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Login token not found. Please login again.");
        return;
      }

      let res;

      if (editingId) {
        console.log("TOKEN:", token);
        console.log("Editing ID:", editingId);
        console.log("Authorization Header:", `Bearer ${token}`);

        // UPDATE COURSE
        res = await api.put(`/courses/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // CREATE COURSE
        res = await api.post("/courses", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert(res.data.message);

      setFormData({
        title: "",
        shortDescription: "",
        category: "",
        duration: "",
        price: "",
        image: "",
        featured: false,
      });

      setEditingLesson(null);
      setShowForm(false);

      fetchCourses();
      fetchDashboard();
    } catch (error) {
      console.log("Course Submit Error:", error);

      alert(error.response?.data?.message || "Course operation failed");
    }
  };
  const handleDelete = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this course?",
      );
      if (!confirmDelete) return;
      const res = await api.delete(`/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
      fetchCourses();
      fetchDashboard();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Course deletion faled");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);

    setFormData({
      title: course.title,
      shortDescription: course.shortDescription,
      category: course.category,
      duration: course.duration,
      price: course.price,
      image: course.image,
      featured: course.featured,
    });

    setShowForm(true);
  };

  useEffect(() => {
    fetchDashboard();
    fetchCourses();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-slate-950 text-white py-28 px-6">
      <div className="max-w-7xl mx-auto">
       <div className="flex justify-between items-start mb-10">

  <div>
    <h1 className="text-4xl font-bold">
      Admin Dashboard
    </h1>

    <p className="text-slate-400 mt-2">
      Manage your learning platform
    </p>
  </div>

  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold transition"
  >
    Logout
  </button>

</div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Total Courses</p>

            <h2 className="text-4xl font-bold text-cyan-400 mt-3">
              {dashboard?.totalCourses || 0}
            </h2>
          </div>

          {/* Students */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Total Students</p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">
              {dashboard?.totalStudents || 0}
            </h2>
          </div>

          {/* Enrollments */}
          <div className="bg-slate-900 rounded-2xl p-6">
            <p className="text-slate-400">Total Enrollments</p>

            <h2 className="text-4xl font-bold text-purple-400 mt-3">
              {dashboard?.totalEnrollments || 0}
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">Course Management</h2>

            <p className="text-slate-400 mt-1">Manage all courses</p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-xl font-semibold transition"
          >
            {showForm ? "Close Form" : "+ Add Course"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <CourseForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              editingId={editingId}
            />
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-slate-900 rounded-2xl p-6">
              <h3 className="text-xl font-bold">{course.title}</h3>

              <p className="text-slate-400 mt-2">{course.shortDescription}</p>
              <div className="flex justify-between mt-5 text-sm">
                <span className="text-cyan-400">{course.category}</span>

                <span>₹{course.price}</span>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg font-semibold"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 py-2 rounded-lg font-semibold"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson Management */}
      <div className="mt-16">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Lesson Management</h2>
          <p className="text-slate-400 mt-1">Add lessons to your courses</p>
        </div>

        <select
          value={selectedCourseId}
          onChange={(e) => {
            const courseId = e.target.value;
            setSelectedCourseId(courseId);
            fetchLessons(courseId);
          }}
          className="w-full max-w-md p-3 rounded bg-slate-800 mb-6"
        >
          <option value="">Select Course to View Lessons</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <LessonForm
          courses={courses}
          editingLesson={editingLesson}
          onSubmit={async (lessonData) => {
            try {
              const token = localStorage.getItem("token");
              let res;
              if (editingLesson) {
                //update lesson
                res = await api.put(
                  `/lessons/${editingLesson._id}`,
                  lessonData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
              } else {
                //create lesson
                res = await api.post("/lessons", lessonData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
              }
              alert(res.data.message);

              //update lessons list refresh
              if (selectedCourseId) {
                fetchLessons(selectedCourseId);
              }

              //edit mode close
              setEditingId(null);
            } catch (error) {
              console.log(error);
              alert(error.response?.data?.message || "Lesson creation failed");
            }
          }}
        />

        {selectedCourseId && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-5">Course Lessons</h2>

            {lessons.length === 0 ? (
              <div className="bg-slate-900 rounded-2xl p-6">
                <p className="text-slate-400">
                  No lessons found for this cocurse.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div
                    key={lesson._id}
                    className="bg-slate-900 rounded-2xl p-5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-bold">
                        {lesson.order}.{lesson.title}
                      </h3>
                      <p className="text-slate-400 mt-1">
                        Duration:{lesson.duration}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400">Lesson</span>
                      <button
                        onClick={() => {
                          setEditingLesson(lesson);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-semibold transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          try {
                            const confirmDelete = window.confirm(
                              "Are you sure you wantto delete this lesson ?",
                            );
                            if (!confirmDelete) return;
                            const token = localStorage.getItem("token");
                            const res = await api.delete(
                              `/lessons/${lesson._id}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              },
                            );
                            alert(res.data.message);
                            fetchLessons(selectedCourseId);
                          } catch (error) {
                            console.log(error);
                            alert(
                              error.response?.data?.message ||
                                "Lesson deletion failed",
                            );
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
