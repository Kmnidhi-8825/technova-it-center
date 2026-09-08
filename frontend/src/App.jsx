import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import { Courses } from "./pages/Courses";
import { CourseDetails } from "./pages/CourseDetails";

import { MyCourses } from "./pages/MyCourses";
import { LearnCourse } from "./pages/LearnCourse";
import { StudentDashboard } from "./pages/StudentDashboard";

import { AdminDashboard } from "./pages/AdminDashboard";

import { Certificate } from "./pages/Certificate";
import VerifyCertificate from "./pages/VerifyCertificate";

import { MyWishlist } from "./pages/MyWishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public Courses */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />

        {/* Protected Student Routes */}
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:courseId"
          element={
            <ProtectedRoute>
              <LearnCourse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Certificate */}
        <Route
          path="/certificate/:courseId"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />

        {/* Public Certificate Verification */}
        <Route
          path="/verify-certificate"
          element={<VerifyCertificate />}
        />

        {/* Protected Wishlist */}
        <Route
          path="/my-wishlist"
          element={
            <ProtectedRoute>
              <MyWishlist />
            </ProtectedRoute>
          }
        />

        {/* Admin Route - ONLY ONE */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;