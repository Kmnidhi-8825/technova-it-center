import jwt from "jsonwebtoken";

export const protect=async(req,res,next)=>{
try {
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({message:"Not Authorized Token missing.",})
    }

    const token=authHeader.split(" ")[1];

    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    req.user={
        id:decoded.id,
        role:decoded.role,
    };
    next();
} catch (error) {
    return res.status(401).json({
        message:"Invalid or expired token",
    });    
}
}

export const adminOnly=(req,res,next)=>{
    if(req.user.role !== "admin") {
        return res.status(403).json({
            message:"Access denied."
        })
    }
    next();
}