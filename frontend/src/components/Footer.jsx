import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-10 px-6">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            TechNova
          </h2>

          <p className="text-gray-400 mt-4 leading-7">
            TechNova IT Center helps students become job-ready MERN Stack Developers through practical learning, real-world projects, interviewpreparation, and career guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-xl mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li className="hover:text-cyan-400 cursor-pointer transition">
              Home
            </li>
            <li className="hover:text-cyan-400 cursor-pointer transition">
              About
            </li>
            <li className="hover:text-cyan-400 cursor-pointer transition">
              Courses
            </li>
            <li className="hover:text-cyan-400 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold text-xl mb-4">
             Popular Courses
          </h3>

          <ul className="space-y-3 text-gray-400">
           <li>MERN Stack Development</li>
  <li>JavaScript Mastery</li>
  <li>React.js Development</li>
  <li>Node.js & MongoDB</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-xl mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 mt-4">
            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-cyan-500 transition flex items-center justify-center">
              <FaFacebookF />
            </button>

            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-cyan-500 transition flex items-center justify-center">
              <FaInstagram />
            </button>

            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-cyan-500 transition flex items-center justify-center">
              <FaTwitter />
            </button>

            <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-cyan-500 transition flex items-center justify-center">
              <FaLinkedinIn />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500">
       © 2026 TechNova IT Center. All Rights Reserved.
      </div>
    </footer>
  );
};

 