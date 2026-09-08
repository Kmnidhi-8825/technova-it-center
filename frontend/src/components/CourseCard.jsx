import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import api from "../services/api";

export const CourseCard = ({ course }) => {
  const [saved, setSaved] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Check whether course is already in wishlist
  const checkWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const exists = res.data.wishlist.some(
        (item) => item.course?._id === course._id
      );

      setSaved(exists);
    } catch (error) {
      console.log("Wishlist Check Error:", error);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, [course._id]);

  // Add / Remove wishlist
  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      setWishlistLoading(true);

      if (saved) {
        // Remove from wishlist
        await api.delete(`/wishlist/${course._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSaved(false);
      } else {
        // Add to wishlist
        await api.post(
          "/wishlist",
          {
            courseId: course._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSaved(true);
      }
    } catch (error) {
      console.log("Wishlist Error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong with wishlist"
      );
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:border-cyan-500 hover:shadow-cyan-500/20 transition duration-300">

      {/* Course Image */}
      <div className="relative">
        <img
          loading="lazy"
          src={course.image || "https://placehold.co/600x400"}
          alt={course.title}
          className="w-full h-52 object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400";
          }}
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          disabled={wishlistLoading}
          className={`absolute top-3 right-3 w-11 h-11 rounded-full flex items-center justify-center transition ${
            saved
              ? "bg-red-500 text-white"
              : "bg-slate-950/80 text-white hover:bg-red-500"
          } ${
            wishlistLoading
              ? "opacity-60 cursor-not-allowed"
              : ""
          }`}
          title={
            saved
              ? "Remove from Wishlist"
              : "Add to Wishlist"
          }
        >
          <FaHeart />
        </button>

        {course.featured && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">

        <h2 className="text-2xl font-bold text-white">
          {course.title}
        </h2>

        <p className="text-slate-400 mt-3 line-clamp-3">
          {course.shortDescription}
        </p>

        <div className="flex justify-between items-center mt-5">
          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
            {course.category}
          </span>

          <span className="text-xl font-bold text-white">
            ₹{Number(course.price).toLocaleString("en-IN")}
          </span>
        </div>

        <p className="text-sm text-slate-400 mt-2">
          Duration: {course.duration}
        </p>

        <Link to={`/courses/${course._id}`}>
          <button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2">
            View Details
            <FaArrowRight />
          </button>
        </Link>

      </div>
    </div>
  );
};