import { motion } from "framer-motion";
import { FaLaptopCode, FaUsers, FaAward } from "react-icons/fa";

export const About = () => {
  const stats = [
    {
      number: "1000+",
      title: "Students Trained",
      icon: <FaUsers />,
    },
    {
      number: "50+",
      title: "Real Projects",
      icon: <FaLaptopCode />,
    },
    {
      number: "95%",
      title: "Placement Support",
      icon: <FaAward />,
    },
  ];

  return (
    <section id="about" className="relative bg-slate-950 py-28 px-6 overflow-hidden">
      {/* Blur Effects */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-700/20 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 font-semibold uppercase tracking-widest">
            About TechNova
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Learn Skills That Build
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Your Career
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto text-lg leading-8">
            TechNova IT Center helps students become job-ready Full Stack
            Developers by providing practical learning, real-world projects,
            interview preparation, and placement-focused training.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-linear-to-r from-cyan-500 to-blue-600 rounded-[40px] blur-3xl opacity-20"></div>

              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
                alt="Students Learning MERN Stack"
                className="relative rounded-[35px] shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              Become a Skilled <br /> Full Stack Developer{" "}
            </h3>

            <p className="text-gray-400 mt-6 leading-8 text-lg">
              Our mission is to help beginners learn MERN Stack from scratch through practical projects, clean coding practices, and           interview-focused guidance so they can confidently start their
              software development career.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition duration-300 backdrop-blur-xl">
                <h4 className="font-semibold text-xl mb-2">
                  Live Project Training
                </h4>
                <p className="text-gray-400">
                  Build production-level MERN Stack projects step by step.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:scale-105 transition duration-300 backdrop-blur-xl">
                <h4 className="font-semibold text-xl mb-2">Interview Preparation</h4>
                <p className="text-gray-400">
                  Practice coding questions, projects, and technical interviews.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="bg-white/5 border border-white/10 rounded-[30px] p-8 text-center backdrop-blur-xl"
            >
              <div className="text-4xl text-cyan-400 flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold">{item.number}</h3>

              <p className="text-gray-400 mt-3">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
