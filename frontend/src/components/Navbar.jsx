import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink} from "react-scroll"
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  const menuItems=[
    { name : "Home" , link: "/#home"},
    { name : "About" , link: "/#about"},
    { name : "Services" , link: "/#services"},
    { name : "Courses" , link: "/courses"},
    { name : "Testimonials" , link: "/#testimonials"},
    { name : "Contact" , link: "/#contact"},
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 lg:px-20 py-5">
      <nav className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl px-8 py-4 shadow-2xl flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            {" "}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              TechNova
            </motion.h1>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 text-gray-200 font-medium">
            {menuItems.map((item)=>(
              <motion.li key={item.name} whileHover={{scale:1.08}}>
                {item.name === "Courses" ? (
                  <Link to="/courses" className="cursor-pointer hover:text-cyan-400 transition duration-300"> {item.name}</Link>
                ) : (
                  <ScrollLink to={item.name.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={-100}
                  className="cursor-pointer hover:text-cyan-400 transition duration-300">{item.name}</ScrollLink>
                )}
              </motion.li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {user?.role === "student" && (

                  <>
                  <Link to="/my-courses">
                    <button className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:tex-white  transition">
                      My Courses
                    </button>
                  </Link>

                  <Link to="/my-wishlist">
                    <button className="px-5 py-2 rounded-xl border border-red-400 text-red-400 hover:bg-red-500 hover:text-white transition">❤️ Wishlist</button>
                  </Link>
                  </>
                )}

                {user?.role === "admin" && (
                  <Link to="/admin-dashboard">
                    <button className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400">
                      Dashboard
                    </button>
                  </Link>
                )}

                <span className="text-cyan-400 font-semibold">
                  Hi,{user?.name}
                </span>

                <button onClick={()=> { logout(); 
                  navigate("/"); setMenuOpen(false); }} className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition">
                  Logout
                </button>
              </> 
            ) : (
              <>
                <Link to="/login">
                  <button className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-500 hover:text-white transition">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                <button className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600  hover:scale-105 transition">Register</button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Icon */}
          <div
            className="md:hidden text-2xl text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-3 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/10 p-6"
          >
           <ul className="flex flex-col gap-5 text-center text-white">
  <li>
    <Link to="/" onClick={() => setMenuOpen(false)}>
      Home
    </Link>
  </li>

  <li>
    <Link to="/courses" onClick={() => setMenuOpen(false)}>
      Courses
    </Link>
  </li>
</ul>

            <div className="flex flex-col gap-4 mt-6">
  {isAuthenticated ? (
    <>
      {user?.role === "student" && (
        <>
          <Link
            to="/my-courses"
            onClick={() => setMenuOpen(false)}
          >
            <button className="w-full py-3 rounded-xl border border-cyan-400 text-cyan-400">
              My Courses
            </button>
          </Link>

          <Link
            to="/my-wishlist"
            onClick={() => setMenuOpen(false)}
          >
            <button className="w-full py-3 rounded-xl border border-red-400 text-red-400">
              ❤️ My Wishlist
            </button>
          </Link>
        </>
      )}

      {user?.role === "admin" && (
        <Link
          to="/admin-dashboard"
          onClick={() => setMenuOpen(false)}
        >
          <button className="w-full py-3 rounded-xl border border-cyan-400 text-cyan-400">
            Dashboard
          </button>
        </Link>
      )}

      <p className="text-center text-cyan-400 font-semibold">
        Hi, {user?.name}
      </p>

      <button
        onClick={() => {
          logout();
          navigate("/");
          setMenuOpen(false);
        }}
        className="py-3 rounded-xl bg-red-500 hover:bg-red-600 transition"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" onClick={() => setMenuOpen(false)}>
        <button className="w-full py-3 rounded-xl border border-cyan-400 text-cyan-400">
          Login
        </button>
      </Link>

      <Link to="/register" onClick={() => setMenuOpen(false)}>
        <button className="w-full py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600">
          Register
        </button>
      </Link>
    </>
  )}
</div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};
