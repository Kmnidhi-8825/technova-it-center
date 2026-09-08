import { useEffect, useState } from "react";
import api from "../services/api";
import { Loading } from "../components/Loading";
import { CourseCard } from "../components/CourseCard";
import {Link} from "react-router-dom";

export const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/enrollments/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const enrolledCourses = res.data.map(
        (item) => item.course
      );

      setCourses(enrolledCourses);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          My Courses
        </h1>

        <p className="text-slate-400 text-center mt-4 mb-12">
          Your enrolled courses
        </p>

        {courses.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold">
              No Enrolled Courses
            </h2>

            <p className="text-slate-400 mt-2">
              Enroll in a course to see it here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id}>
                <CourseCard course={course} />
                <Link to={`/learn/${course._id}`}>
                  <button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
                    Continue Learning
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};