import express from "express";

import {
  authMiddleware,
  ownerOnlyMiddleware,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {register,login,getMe,updateProfile,updateHabits,updatePassword,deleteAccount,} from "../controllers/authController.js";

const router = express.Router();


// ─── Public Routes ──────────────────────────────────────────
router.post("/register", register);

router.post("/login", login);


// ─── Protected Routes ───────────────────────────────────────
router.get("/me", authMiddleware, getMe);

router.put(
  "/update-profile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);

router.patch("/me/habits", authMiddleware, updateHabits);

router.patch("/me/password", authMiddleware, updatePassword);

router.delete("/me", authMiddleware, deleteAccount);


// Example Owner Only Route
// router.post("/create-pg", authMiddleware, ownerOnlyMiddleware, createPG);


export default router;