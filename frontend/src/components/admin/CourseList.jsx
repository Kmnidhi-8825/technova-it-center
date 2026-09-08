import {AdminCourseCard} from "./AdminCourseCard";

export const CourseList = ({ courses, onEdit, onDelete }) => {
  return (
    <section className="mt-10">
      <h2 className="text-3xl font-bold mb-6">All Courses</h2>

      {courses.length === 0 ? (
        <div className="bg-slate-900 rounded-xl p-10 text-center border border-slate-800">
          <h3 className="text-xl font-semibold text-white">No Courses Found</h3>

          <p className="text-slate-400 mt-2">
            Click <span className="font-semibold">"Add Course"</span> to create
            your first course.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {courses.map((course) => (
            <AdminCourseCard
              key={course._id}
              course={course}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};
