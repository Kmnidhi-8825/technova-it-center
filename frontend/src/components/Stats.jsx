import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaBriefcase,
  FaStar,
  FaBookOpen,
} from "react-icons/fa";

export const Stats = () => {
  const statsData = [
    {
      icon: <FaUserGraduate />,
      number: "10,000+",
      title: "Students Trained",
    },
    {
      icon: <FaBriefcase />,
      number: "2,500+",
      title: "Placements",
    },
    {
      icon: <FaStar />,
      number: "4.9/5",
      title: "Student Rating",
    },
    {
      icon: <FaBookOpen />,
      number: "25+",
      title: "Professional Courses",
    },
  ];

  return (
    <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {statsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:border-cyan-400 transition-all duration-300"
            >
              <div className="text-5xl text-cyan-400 flex justify-center mb-5">
                {item.icon}
              </div>

              <h2 className="text-4xl font-bold">
                {item.number}
              </h2>

              <p className="text-gray-400 mt-3">
                {item.title}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};