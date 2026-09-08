import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import api from "../services/api";
import { Loading } from "../components/Loading";

export const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(res.data.wishlist);
    } catch (error) {
      console.log("Wishlist Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (courseId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/wishlist/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist((prev) =>
        prev.filter((item) => item.course._id !== courseId)
      );

      alert("Course removed from wishlist");
    } catch (error) {
      console.log("Remove Wishlist Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to remove course"
      );
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-slate-950 text-white py-28 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          My Wishlist <FaHeart className="inline text-red-500" />
        </h1>

        <p className="text-slate-400 text-center mt-4 mb-12">
          Your saved courses
        </p>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <FaHeart className="text-5xl text-slate-600 mx-auto mb-5" />

            <h2 className="text-2xl font-bold">
              Your Wishlist is Empty
            </h2>

            <p className="text-slate-400 mt-3">
              Save courses that you want to learn later.
            </p>

            <Link to="/courses">
              <button className="mt-6 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition">
                Explore Courses
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden"
              >
                <img
                  src={
                    item.course.image ||
                    "https://placehold.co/600x400"
                  }
                  alt={item.course.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6 flex flex-col h-280px">
                  <h2 className="text-2xl font-bold">
                    {item.course.title}
                  </h2>

                  <p className="text-slate-400 mt-3 line-clamp-3">
                    {item.course.shortDescription}
                  </p>

                  <p className="text-cyan-400 font-bold mt-4">
                    ₹{Number(item.course.price).toLocaleString("en-IN")}
                  </p>

<div className="flex gap-3 mt-auto items-stretch">
                    <Link to={`/courses/${item.course._id}`} className="flex-1">
                      <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition">
                        View Course
                      </button>
                    </Link>

                    <button onClick={() => removeWishlist(item.course._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl transition flex items-center justify-center" title="Remove from Wishlist">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
};