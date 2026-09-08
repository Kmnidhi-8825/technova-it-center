import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export const Contact = () => {
  return (
    <section id="contact" className="relative bg-slate-950 py-28 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[120px]"></div>

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
             Get In Touch
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
             Start Your
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Learning Journey
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-lg">
            Have questions about our MERN Stack courses? Contact us today and begin your journey toward becoming a job-ready developer.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6 flex gap-5 items-center hover:border-cyan-400/30 transition duration-300">
              <div className="text-cyan-400 text-2xl">
                <FaPhoneAlt />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Phone Number
                </h3>

                <p className="text-gray-400">
                  +91 XXXXXXXXXX
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6 flex gap-5 items-center hover:border-cyan-400/30 transition duration-300">
              <div className="text-cyan-400 text-2xl">
                <FaEnvelope />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Email Address
                </h3>

                <p className="text-gray-400">
                  support@technovaitcenter.com
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[30px] p-6 flex gap-5 items-center hover:border-cyan-400/30 transition duration-300">
              <div className="text-cyan-400 text-2xl">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Office Address
                </h3>

                <p className="text-gray-400">
                  Gurugram, Haryana, India
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side Form */}
          <motion.form
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full mt-5 bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400"
            />

            <textarea
              rows="5"
              placeholder="Message"
              className="w-full mt-5 bg-slate-900 border border-white/10 rounded-2xl p-4 outline-none focus:border-cyan-400 resize-none"
            ></textarea>

            <button className="mt-6 w-full py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition duration-300 shadow-lg shadow-cyan-500/20">
             Send Enquiry
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

 