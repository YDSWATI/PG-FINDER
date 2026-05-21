import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getMatches,
  getMatchWithUser,
} from "../controllers/matchController.js";

const router = express.Router();


// GET ALL MATCHES
router.get(
  "/",
  authMiddleware,
  getMatches
);


// GET SINGLE MATCH
router.get(
  "/:userId",
  authMiddleware,
  getMatchWithUser
);

export default router;