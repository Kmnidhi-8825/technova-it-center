import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);
      alert(res.data.message || "Login Successful");
      
      if(res.data.user.role === "admin") {
        navigate("/admin-dashboard")
      } else {
        navigate("/")
      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-[35px] p-8 shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-400 text-center mb-8">
          Login to continue
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-900 border border-white/10 outline-none focus:border-cyan-400"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-5 right-5 text-gray-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button type="button">
              Forgot Password?
            </button>
          </div>

          <button className="w-full py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] transition duration-300 font-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-cyan-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

