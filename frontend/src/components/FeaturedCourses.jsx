import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";

export const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchFeaturedCourses = async () => {
    try {
      const res = await api.get("/courses");
      console.log(res.data);      

      const featured = res.data.filter(
        (course) => course.featured === true
      );
      
      console.log(featured);
      
      setCourses(featured);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-4">
          Featured Courses
        </h2>

        <p className="text-center text-gray-400 mb-12">
          Learn with our most popular job-ready courses.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((course) => (
            <motion.div
              key={course._id}
              whileHover={{ y: -8 }}
              className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-700"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {course.title}
                </h3>

                <p className="text-gray-400 mt-3">
                  {course.shortDescription}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-cyan-400 font-bold text-xl">
                    ₹{course.price}
                  </span>

                  <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg">
                    View Details
                  </button>

                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};