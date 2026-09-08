import { useEffect, useState } from "react";
import api from "../services/api";
import { CourseForm } from "../components/admin/CourseForm";
import { CourseList } from "../components/admin/CourseList";
import { Sidebar } from "../components/admin/Sidebar";
import {StatCard} from "../components/admin/StatCard"
import { Loading } from "../components/Loading";
import { LessonForm } from "../components/LessonForm";


export const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading,setLoading]=useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    category: "",
    duration: "",
    price: "",
    image: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchCourses = async () => {
     try {
      setLoading(true);
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

  if(loading){
    return <Loading/>
  }

const featuredCourses=courses.filter(
  (course)=>course.featured);

const totalCategories=new Set(courses.map((course)=>course.category)).size;



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (editingId) {
        res = await api.put(`/courses/${editingId}`, formData);
      } else {
        res = await api.post("/courses", formData);
      }

      alert(res.data.message);
      fetchCourses(); // Refresh the course list after adding a new course

      setEditingId(null); // Reset editing state

      setFormData({
        title: "",
        shortDescription: "",
        category: "",
        duration: "",
        price: "",
        image: "",
        featured: false,
      });
    } catch (error) {   
      alert(error.response?.data?.message || "Course creation failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?",
    );
    if (!confirmDelete) return;
    try {
      const res = await api.delete(`/courses/${id}`);
      alert(res.data.message);
      fetchCourses(); // Refresh the course list after deletion
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setFormData({
      title: course.title,
      shortDescription: course.shortDescription,
      category: course.category,
      duration: course.duration,
      price: course.price,
      image: course.image,
      featured: course.featured,
    });


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    }); // Scroll to the top of the page for editing
  };

 
    const handleLessonSubmit=async(lessonData)=>{
      try {
        const res=await api.post("/lessons", lessonData)
        alert(res.data.message)
     }  catch (error) {
      alert(error.response?.data?.message || "Lesson Creation failed")

      }
    }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Courses" value={courses.length} color="bg-cyan-600"/>
          <StatCard title="Featured Courses" value={featuredCourses.length} color="bg-green-600"/>
          <StatCard title="Categories" value={totalCategories} color="bg-purple-600"/>
        </div>
        <CourseForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editingId={editingId}
        />

        <CourseList
          courses={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

<LessonForm onSubmit={handleLessonSubmit} />  
    </main>
    </div>
  );
};
