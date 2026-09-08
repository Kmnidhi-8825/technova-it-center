import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export const Testimonials = () => {
 const testimonialsData = [
  {
    name: "Rahul Sharma",
    role: "MERN Stack Student",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    review:"The live projects helped me understand real development. I feel much more confident in React and Node.js now.",
  },
  {
    name: "Priya Gupta",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    review:
      "The interview preparation sessions and project guidance were extremely helpful. I improved both my coding and confidence.",
  },
  {
    name: "Aman Verma",
    role: "Full Stack Learner",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    review:
      "From JavaScript basics to building a complete MERN project, everything was explained step by step.",
  },
];

  return (
    <section id="testimonials" className="relative py-28 px-6 bg-slate-950 overflow-hidden">

      {/* Glow Effects */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />

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
            Student Reviews
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            What Our
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Students Say
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
             Hear from students who learned practical development,
  built real-world projects, and improved their interview skills
  with TechNova IT Center.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonialsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className="group relative rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 overflow-hidden transition duration-500"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-cyan-500/10 to-blue-500/10"></div>

              {/* Stars */}
              <div className="relative z-10 flex gap-1 text-yellow-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Review */}
              <p className="relative z-10 text-gray-300 leading-8 mb-8">
                "{item.review}"
              </p>

              {/* Client */}
              <div className="relative z-10 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                />

                <div>
                  <h4 className="font-semibold text-lg">
                    {item.name}
                  </h4>

                  <p className="text-gray-400 text-sm">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

