import Wishlist from "../models/Wishlist.js";

// Add course to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.body;

    const existingWishlist = await Wishlist.findOne({
      student: studentId,
      course: courseId,
    });

    if (existingWishlist) {
      return res.status(400).json({
        message: "Course already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({
      message: "Course added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.log("Wishlist Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Get student's wishlist
export const getWishlist = async (req, res) => {
  try {
    const studentId = req.user.id;

    const wishlist = await Wishlist.find({
      student: studentId,
    }).populate("course");

    res.status(200).json({
      wishlist,
    });
  } catch (error) {
    console.log("Get Wishlist Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Remove course from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const studentId = req.user.id;
    const { courseId } = req.params;

    const wishlist = await Wishlist.findOneAndDelete({
      student: studentId,
      course: courseId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Course not found in wishlist",
      });
    }

    res.status(200).json({
      message: "Course removed from wishlist",
    });
  } catch (error) {
    console.log("Remove Wishlist Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};