import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";


// ─── Helper: send token response ─────────────────────────────────────────────
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password, city, role, phone } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    // 2. Create user (password is hashed by pre-save hook in the model)
    const user = await User.create({
      name,
      email,
      password,
      city,
      role: role || "seeker",
      phone,
    });

    // 3. Return token + user (password excluded by toJSON method)
    sendTokenResponse(user, 201, res);

  } catch (error) {
    // Handle mongoose validation errors cleanly
    // if (error.name === "ValidationError") {
    //   const messages = Object.values(error.errors).map((e) => e.message);
    //   return res.status(400).json({ success: false, message: messages[0] });
    // }
    // res.status(500).json({ success: false, message: "Server error" });

    res.status(500).json({
    success: false,
    message: error.message,
  });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // 2. Find user — explicitly select password (it's hidden by default)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account has been deactivated",
      });
    }

    // 4. Compare password using instance method from model
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5. Return token — toJSON() strips the password before sending
    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/auth/me
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  try {
    // req.user is attached by the auth middleware
    // const user = await User.findById(req.user.id).populate(
    //   "savedListings",
    //   "title city rent area photos"
    // );
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/auth/me
// @access  Private
// Update profile — name, phone, city, budget
// ─────────────────────────────────────────────────────────────────────────────

import { uploadOnCloudinary } from "../utils/cloudinary.js";

const updateProfile = async (req, res) => {
  try {

    const { name, phone, city, budget } = req.body;

    let avatar;

    // upload avatar if file exists
    if (req.file) {

      const uploadedAvatar = await uploadOnCloudinary(
        req.file.path
      );

      if (uploadedAvatar) {
        avatar = uploadedAvatar.secure_url;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        phone,
        city,
        budget,

        // only update avatar if uploaded
        ...(avatar && { avatar }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {

    console.log(error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (e) => e.message
      );

      return res.status(400).json({
        success: false,
        message: messages[0],
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
}
};



// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/auth/me/habits
// @access  Private
// Called when user submits the 5-step habit quiz
// ─────────────────────────────────────────────────────────────────────────────
const updateHabits = async (req, res) => {
  try {

    const {
  sleepTime,
  foodPref,
  noiseLevel,
  cleanliness,
  field,
} = req.body || {};
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.habits = {
      sleepTime,
      foodPref,
      noiseLevel,
      cleanliness,
      field,
    };

    user.quizCompleted = true;

    await user.save();
    console.log("Updated habits for user:", user._id);
    return res.status(200).json({
      success: true,
      message: "Habits updated successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/auth/me/password
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    // Must select password explicitly since it's hidden by default
    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Assigning triggers the pre-save hook which re-hashes the new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   DELETE /api/auth/me
// @access  Private
// Soft delete — sets isActive to false, doesn't remove from DB
// ─────────────────────────────────────────────────────────────────────────────
const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
    res
      .status(200)
      .json({ success: true, message: "Account deactivated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

 export{
  register,
  login,
  getMe,
  updateProfile,
  updateHabits,
  updatePassword,
  deleteAccount,
};