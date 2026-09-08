import { useEffect, useState } from "react";
import api from "../services/api";
import { CourseCard } from "../components/CourseCard";
import { Loading } from "../components/Loading";

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCourses, setVisibleCourses] = useState(6);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
  setVisibleCourses(6);
}, [search, category, sortBy]);

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortBy === "highToLow") {
      return b.price - a.price;
    }

    if (sortBy === "nameAZ") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  const displayedCourses = sortedCourses.slice(0, visibleCourses);

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-slate-950 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center">Our Courses</h1>
        <p className="text-gray-400 text-center mt-4 mb-12">
          Explore our latest professional courses.
        </p>
        
        <div className="max-w-xl mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search Courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-500 transition"
          />

          <div className="max-w-xl mx-auto mt-6 mb-12">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white outline-none focus:border-cyan-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full mt-4 bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white outline-none focus:border-cyan-500"
            >
              <option value="default">Sort Courses</option>
              <option value="lowToHigh">Price : Low to High</option>
              <option value="highToLow">Price : High to Low</option>
              <option value="nameAZ">Name : A to Z</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSortBy("default");
                setVisibleCourses(6);
              }}
              className="mt-4 w-full border border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 py-3 rounded-xl transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCourses.length > 0 ? (
            displayedCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h2 className="text-2xl font-bold text-white">
                No Courses Found
              </h2>
              <p className="text-slate-400 mt-2">
                Try searching with another keyword
              </p>
            </div>
          )}
        </div>
        {visibleCourses < sortedCourses.length && (
          <div className="flex-justify-center mt-12">
            <button
              onClick={() => setVisibleCourses((prev) => prev + 6)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition"
            >
              {" "}
              Load More Courses
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
