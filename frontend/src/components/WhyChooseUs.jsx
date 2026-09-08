import {motion} from 'framer-motion'
import {FaLaptopCode,FaProjectDiagram,FaUserTie,FaCertificate,} from "react-icons/fa";

export const WhyChooseUs = () => {

     const features = [
    {
      icon: <FaLaptopCode />,
      title: "Industry-Oriented Curriculum",
      description:
        "Learn the latest technologies with a structured roadmap designed for real jobs.",
    },
    {
      icon: <FaProjectDiagram />,
      title: "Real-World Projects",
      description:
        "Build production-level MERN Stack projects to strengthen your portfolio.",
    },
    {
      icon: <FaUserTie />,
      title: "Interview Preparation",
      description:
        "Practice coding questions, mock interviews, resume building and GitHub optimization.",
    },
    {
      icon: <FaCertificate />,
      title: "Career Guidance",
      description:
        "Get mentorship, career advice and placement-focused learning.",
    },
  ];

  return (
     <section className="bg-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Why Choose
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}TechNova?
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            We focus on practical learning, real-world projects and interview preparation
            to make you job-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400 transition"
            >
              <div className="text-5xl text-cyan-400 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
