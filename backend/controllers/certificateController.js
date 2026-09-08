import Certificate from "../models/Certificate.js";

//GET certificate for a completed course
export const getCertificate=async(req,res)=>{
    try {
        const studentId=req.user.id;
        const {courseId}=req.params;
        const certificate =await Certificate.findOne({
            student:studentId,
            course:courseId,
        })
        .populate("student","name email")
        .populate("course","title")

        if(!certificate) {
            return res.status(404).json({
                message:"Certificate not available yet",
            });
        }

        res.status(200).json({
            certificate,
        })
    } catch (error) {
      console.log("Certificate Error : " , error);
      res.status(500).json({
        message:error.message,
      })
        
    }
}


//verify certificate by certificate ID
export const verifyCertificate=async(req,res)=>{
    try {
        const {certificateId}=req.params;
        const certificate=await Certificate.findOne({
            certificateId,
        })
        .populate("student","name email")
        .populate("course","title")
        if(!certificateId) {
            return res.status(404).json({
                valid:false,
                message:"Certificate not found",
            })
        }

        res.status(200).json({
            valid:true,
            message:"Certificate is valid",
            certificate,
        })
    } catch (error) {
        console.log("Certificate Verification Error : " , error);
        res.status(500).json({
            valid:false,
            message:error.message,
        })
        
    }
}