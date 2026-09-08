import Course from "../models/Course.js"

//GET all courses
export const getCourses = async (req, res) => {
    try {
        const courses=await Course.find().sort({createdAt:-1});
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//CREATE course   
export const createCourse=async(req,res)=>{
    try{
        const {title,shortDescription,category,duration,price,image,featured}=req.body;

        const course=await Course.create({title,shortDescription,category,duration,price,image,featured});

        res.status(201).json({
            message:"Course created successfully",
            course,
        })
    }
    catch (error) {
        res.status(500).json({message:error.message});
    }
}

//DELETE Course
export const deleteCourse=async(req,res)=>{
try {
    const {id}=req.params;
     const course=await Course.findByIdAndDelete(id);
    if(!course){
        return res.status(404).json({message:"Course not found"});
    }  

    res.status(200).json({ message:"Course deleted successfully"});

}
catch (error) {
    res.status(500).json({message:error.message});
}
}



//UPDATE Course

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET Single Course
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};