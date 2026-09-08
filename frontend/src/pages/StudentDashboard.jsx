import {useEffect , useState} from 'react'
import api from "../services/api"
import {Loading} from "../components/Loading"
import {Link} from "react-router-dom"
// import  {useNavigate} from "react-router-dom"

export const StudentDashboard = () => {

    const [courses,setCourses]=useState([])
    const [loading,setLoading]=useState(true)
    // const navigate=useNavigate();

    const fetchDashboard=async()=>{
        try {
            const token=localStorage.getItem("token");
            const res=await api.get("/student/dashboard",{
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });

            setCourses(res.data.courses);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
     fetchDashboard();
    },[])
    if (loading) return <Loading/> ;

  return (
    <section className='min-h-screen bg-slate-950 text-white py-28 px-6'> 
    
    <div className="max-w-7xl mx-auto">
        <h1 className='text-4xl font-bold'> Student Dashboard</h1>
        <p className="text-slate-400 mt-2 mb-10">
            Track your learning progress
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">

    <Link
        to="/my-courses"
        className="bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-2xl p-6 transition"
    >
        <h2 className="text-xl font-bold text-cyan-400">
            📚 My Courses
        </h2>

        <p className="text-slate-400 mt-2">
            Continue learning and track your course progress.
        </p>
    </Link>

    <Link
        to="/my-wishlist"
        className="bg-slate-900 border border-slate-700 hover:border-red-500 rounded-2xl p-6 transition"
    >
        <h2 className="text-xl font-bold text-red-400">
            ❤️ My Wishlist
        </h2>

        <p className="text-slate-400 mt-2">
            View courses that you saved for later.
        </p>
    </Link>

</div>

        {courses.length === 0 ? (
            <div className="bg-slate-900 rounded-2xl p-10 text-center">
                <h2 className="text-2xl font-bold"> No Enrolled Courses</h2>

                <p className="text-slate-400 mt-2">
                    Enroll in a course to start learning.
                </p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((item)=>(
                    <div key={item.course._id} className="bg-slate-900 rounded-2xl p-6">
                        <h2 className="text-xl font-bold">
                            {item.course.title}
                        </h2>

                        <p className="text-slate-400 mt-2">{item.completedLessons} / {item.totalLessons} lessons completed </p>

                        <div className="w-full bg-slate-800 rounded-full h-3 mt-5">

                            <div className="bg-cyan-500 h-3 rounded-full" style={{width: `${item.percentage}%`,}}/>
                            </div>
                            <p className="text-cyan-400 font-semibold mt-2">{item.percentage}% Complete</p>

                            <Link to={`/learn/${item.course._id}`} className='block'>
                            <button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition"> Continue Learning</button>
                            </Link>
                    </div>
                ))}
            </div>
        )} 
        
    </div>
    </section>
  )
}

 