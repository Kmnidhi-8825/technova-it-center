export const AdminCourseCard = ({ course, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 hover:border-cyan-500 transition duration-300">

      {/* Course Image */}
      <div className="relative">
        <img
          loading="lazy"
          src={course.image || "https://placehold.co/600x400"}
          alt={course.title}
          className="w-full h-52 object-cover"
          onError={(e)=>{
            e.target.src="https://placehold.co/600x400"
          }}
        />

        {course.featured && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow">
            ⭐ Featured
          </span>
        )}
      </div>

      <div className="p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-white">
          {course.title}
        </h2>

        {/* Description */}
        <p className="text-slate-400 mt-3 line-clamp-3">
          {course.shortDescription}
        </p>

        {/* Details */}
        <div className="mt-5 space-y-2 text-sm">

          <p>
            <span className="font-semibold text-white">
              Category :
            </span>{" "}
            {course.category}
          </p>

          <p>
            <span className="font-semibold text-white">
              Duration :
            </span>{" "}
            {course.duration}
          </p>

          <p className="text-cyan-400 font-bold text-xl">
            ₹ {Number(course.price).toLocaleString("en-IN")}
          </p>

        </div>

        {/* Buttons */}

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onEdit(course)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold transition"
          >
            ✏ Edit
          </button>

          <button
            onClick={() => onDelete(course._id)}
            className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
          >
            🗑 Delete
          </button>

        </div>

      </div>
    </div>
  );
};

