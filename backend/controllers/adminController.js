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

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log("Get Users Error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};