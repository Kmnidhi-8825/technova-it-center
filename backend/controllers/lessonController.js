import Lesson from "../models/Lesson.js";

//GET Lessons of a Course
export const getLessons=async(req,res)=>{
    try {
         const lessons=await Lesson.find({
            course:req.params.courseId,
         }).sort({order:1});

         res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })        
    }
}


// Create Lesson

export const createLesson=async(req,res)=>{
    try {
        const lesson=await Lesson.create(req.body)
        res.status(201).json({
            message:"Lesson created successfully",
            lesson,
        })

    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
     }
}

//update lesson
export const updateLesson =async(req,res)=>{
    try {
        const {id}=req.params;
        const lesson=await Lesson.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true,
                runValidators:true,
            }
        )

        if(!lesson) {
            return res.status(404).json({
                message:"LEsson not found",
            })
        }

        res.status(200).json({
            message:"Lesson updated successfully",
            lesson,
        })
    } catch (error) {
     res.status(500).json({
        message:error.message,
     })     
    }
}


//Delete lesson 
export const deleteLesson=async(req,res)=>{
    try {
        const {id}=req.params;
        const lesson=await Lesson.findByIdAndDelete(id);
        if(!lesson) {
            return res.status(404).json({
                message:"Lesson not found !",
            })
        }

        res.status(200).json({
    message: "Lesson deleted successfully",
});
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })        
    }
}