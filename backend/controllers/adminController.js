import Course from "../models/Course.js";
import User from "../models/User.js"
import Enrollment from "../models/Enrollment.js"

//Admin Dashboard
export const getAdminDashboard=async(req,res) =>{
try {
    const totalCourses=await Course.countDocuments();
    const totalStudents=await User.countDocuments({role:"student"});
    const totalEnrollments = await Enrollment.countDocuments();

    res.status(200).json({
        totalCourses,
        totalStudents,
        totalEnrollments,
    })
} catch (error) {
    console.log(("Admin Dashboard Error : ",error));
    res.status(500).json({
        message:error.message,
    })
    
}
}