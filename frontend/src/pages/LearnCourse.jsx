import api from "../services/api"
import { useParams , useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loading } from "../components/Loading"

export const LearnCourse = () => {

const {courseId} = useParams()

const [lessons,setLessons]=useState([])
const [loading,setLoading]=useState(true)
const [selectedLesson,setSelectedLesson]=useState(null)
const [progress,setProgress]=useState(null)
const [certificate, setCertificate] = useState(null);
const navigate=useNavigate()

 const fetchLessons=async()=>{
    try {
        console.log("Course ID:" , courseId);
        const res=await api.get(`/lessons/${courseId}`);
        console.log("Lessons:",res.data);
        setLessons(res.data);
        if(res.data.length > 0) { 
            setSelectedLesson(res.data[0]);
        }
    } catch(error) {
        console.log(error);        
    } finally {
        setLoading(false);
    }
 };

 const fetchProgress = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await api.get(`/progress/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Progress Response : " , res.data);
    setProgress(res.data.progress);
  } catch (error) {
    console.log("Progress Error",error);
  }
};

const fetchCertificate=async()=>{
  try {
    const token=localStorage.getItem("token")
    const res=await api.get(`/certificates/${courseId}` , {
      headers : {
        Authorization : `Bearer ${token}`,
      },
    });

    console.log("Certificate : " , res.data);

    setCertificate(res.data.certificate)
    
  } catch (error) {

    //404 ka matlab certificate abhi available nahi hai
    if(error.response?.status===404) 
    {
      setCertificate(null);
    } else {
      console.log("Certificate Error : " , error);
      
    }
    
  }
}

 const completeLesson = async () => {
  try {
    const token = localStorage.getItem("token");
    const res=await api.post("/progress/complete",
      {
        courseId,
        lessonId: selectedLesson._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
 console.log("Complete Lesson Response: " , res.data);
 
 //Backend se updated progress directly state mein save hoga
 setProgress(res.data.progress);
 
    alert("Lesson Completed 🎉");

    await fetchProgress();
    await fetchCertificate();

  } catch (error) {
    console.log("Complete Lesson Error : " , error);
    alert(error.response?.data?.message || "Failed to Complete Lesson")
  }
};
 useEffect(()=>{
    fetchLessons();
    fetchProgress();
    fetchCertificate();
 }, [courseId]);

 if (loading) return <Loading />;

 const completedLessonIds = progress?.completedLessons || [];
 
 //sirf current course ke actual lessons count honge
 const completedCount=lessons.filter((lesson)=>
completedLessonIds.some(
  (id) => id.toString() === lesson._id.toString()
)
).length;
 
const percentage=lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0 ;

const isCourseCompleted = lessons.length > 0 && completedCount === lessons.length;

const isLessonCompleted=progress?.completedLessons?.some((id) => id.toString() === selectedLesson?._id?.toString())
  return (
    <section className="min-h-screen bg-slate-950 text-white p-8 ">
       <h1 className="text-4xl font-bold mb-8">Learn Course</h1>
       <div className="mb-8">
        <div className="flex justify-between mb-2">
            <span>Course progress</span>
            <span>{percentage}%</span>
        </div>

        <div className="w-full bg-slate-800 rounded-full h-4">
            <div className="bg-cyan-500 h-4 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
        </div>
       </div>

       {isCourseCompleted && (
        <div className="mt-6 bg-green-900/30 border border-green-500 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-green-400">🎉 Congratulations!</h2>
          <p className="text-slate-300 mt-2">You have successfully completed this course.</p>
          {certificate ? (
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition"
             onClick={() => navigate(`/certificate/${courseId}`)}> 🏆 View Certificate </button>
          ) : (
            <p className="text-slate-400 mt-4">Preparing your certificate...</p>
          )}
        </div>
       )}

       <div className="grid lg:grid-cols-3 gap-8">

        {/* video */}
        <div className="lg:col-span-2">
            {selectedLesson ? (
                <>
                
                <iframe className="w-full aspect-video rounded-2xl" src={selectedLesson.videoUrl}  title = {selectedLesson.title} allowFullScreen></iframe>
                <h2 className="text-2xl font-bold mt-6">{selectedLesson.title}</h2>
                 <p className="text-slate-400 mt-2">Duration : {selectedLesson.duration}</p>
                 <button className={`mt-6 px-6 py-3 rounded font-semibold transition ${
                  isLessonCompleted
                  ? "bg-green-600 cursor-default"
                  : "bg-cyan-500 hover:bg-cyan-600"
                 }`}
                  onClick={completeLesson}
                  disabled={isLessonCompleted}>
                     {isLessonCompleted
                     ? " ✓ Lesson Completed "
                     : "✅ Complete Lesson"}
                     
                 </button>
                </>
            ) : (
                <h2> No Lessons Available</h2>
            )}
        </div>

        {/* Lesson List */}
        <div className="bg-slate-900 rounded-2xl p-5">
            <h2 className="text-2xl font-bold mb-5">Lessons</h2>
            
            {lessons.map((lesson)=>(
                <button key={lesson._id} onClick={()=>setSelectedLesson(lesson)} className={`w-full text-left p-4 rounded-xl mb-3 transition ${
                    selectedLesson?._id === lesson._id ? "bg-cyan-600" : "bg-slate-800 hover:bg-slate-700"
                }`}>
                    <div className="flex justify-between items-center">
                        <span>{lesson.order}.{lesson.title}</span>
                        {progress?.completedLessons?.some(
                          (id) => id.toString() === lesson._id.toString()
                        ) && (
                          <span className="text-green-400 font-bold"> ✔ </span>
                        )}
                    </div>
                </button>
            ))}
        </div>
       </div>
    </section>
  )
}
