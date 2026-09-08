import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import lessonRoutes from "./routes/lessonRoutes.js"
import progressRoutes from "./routes/progressRoutes.js";
import studentRoutes from "./routes/studentRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import certificateRoutes from "./routes/certificateRoutes.js"
import wishlistRoutes from "./routes/wishlistRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/certificates",certificateRoutes );
app.use("/api/wishlist", wishlistRoutes);
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});