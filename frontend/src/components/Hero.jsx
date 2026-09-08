import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-6">

      {/* Gradient Blur Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-700 rounded-full blur-[120px] opacity-20"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center mt-30">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-cyan-500/10 text-cyan-400 px-5 py-2  rounded-full border border-cyan-500/20 ">
            #1 MERN Stack Learning Platform
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mt-6">
            Become Job-Ready
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "} MERN Stack Developer
            </span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg leading-8 max-w-xl">
             Learn Full Stack Web Development with real-world projects, live mentorship, interview preparation, and placement-focused training.MAster MongoDB , Express.js , React.js and Node.js from begineers to advanced.          </p>

          <div className="flex flex-wrap gap-5 mt-8">
            <button className="px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/30 flex items-center gap-3">
              Start Learning                                    
              <FaArrowRight />
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/20 hover:bg-white/10 transition-all">
             Explore Courses
            </button>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[40px] p-6 shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
              alt="IT Company"
              className="rounded-[30px] w-full h-[500] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

 