import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Loading } from "../components/Loading";

export const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const handleEnroll = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first.");
    navigate("/login");
    return;
  }

  try {
    const res = await api.post(
      "/enrollments",
      {
        courseId: course._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);
    navigate("/my-courses")

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Enrollment failed."
    );
  }
};

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (loading) return <Loading />;

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Course not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Left */}
        <div>
          <img
            src={course.image || "https://placehold.co/800x500"}
            alt={course.title}
            className="w-full rounded-2xl object-cover"
          />
        </div>

        {/* Right */}
        <div>
          {course.featured && (
            <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
              ⭐ Featured Course
            </span>
          )}

          <h1 className="text-5xl font-bold mt-6">{course.title}</h1>

          <p className="text-slate-400 mt-6 leading-8">
            {course.shortDescription}
          </p>

          <div className="space-y-4 mt-8">
            <h3 className="text-xl">
              <span className="font-semibold">Category :</span>{" "}
              {course.category}
            </h3>

            <h3 className="text-xl">
              <span className="font-semibold">Duration :</span>{" "}
              {course.duration}
            </h3>

            <h2 className="text-4xl text-cyan-400 font-bold">
              ₹ {course.price}
            </h2>
          </div>

          <button onClick={handleEnroll} className="mt-10 w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-xl font-semibold transition">
            Enroll Now
          </button>
<Link to="/courses">
  <button className="mt-4 w-full border border-slate-600 hover:bg-slate-800 py-4 rounded-xl transition">
    Back to Courses
  </button>
</Link>
        </div>
      </div>
    </section>
  );
};
