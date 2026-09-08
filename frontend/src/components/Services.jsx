import { motion } from "framer-motion";
import {
  FaCode,
  FaLaptopCode,
  FaMobileAlt,
  FaServer,
  FaPaintBrush,
  FaBullhorn,
} from "react-icons/fa";

export const Services = () => {
 const servicesData = [
  {
    icon: <FaLaptopCode />,
    title: "MERN Stack Development",
    description:"Learn MongoDB, Express.js, React.js and Node.js by building real-world projects.",
  },
  {
    icon: <FaCode />,
    title: "JavaScript Mastery",
    description:
      "Master JavaScript from basics to advanced concepts with hands-on practice.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive Web Design",
    description:
      "Build modern, responsive websites using HTML, CSS, Tailwind CSS and React.",
  },
  {
    icon: <FaServer />,
    title: "Backend Development",
    description:
      "Create secure REST APIs with Node.js, Express.js and MongoDB.",
  },
  {
    icon: <FaPaintBrush />,
    title: "Live Projects",
    description:
      "Work on production-level projects to build a strong GitHub portfolio.",
  },
  {
    icon: <FaBullhorn />,
    title: "Interview Preparation",
    description:
      "Prepare for technical interviews with coding practice, mock interviews and resume guidance.",
  },
];
  return (
    <section id="services" className="relative py-28 px-6 bg-slate-950 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 uppercase tracking-[4px] font-semibold">
            Our Courses
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
           Master In-Demand
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Tech Skills
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
            Learn industry-ready technologies with practical projects,expert guidance, interview preparation and placement-focusedtraining.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-400/30 transition duration-500"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-cyan-500/10 to-blue-600/10"></div>

              {/* Icon */}
              <div className="relative z-10 text-5xl text-cyan-400 mb-6">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="relative z-10 text-gray-400 leading-7">
                {service.description}
              </p>

              {/* Button */}
              <button className="relative z-10 mt-6 text-cyan-400 font-medium hover:translate-x-2 transition duration-300">
                View Course →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

