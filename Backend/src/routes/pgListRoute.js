import express from "express";
import { upload } from "../middlewares/multer.middleware.js";

import {
  authMiddleware,
  ownerOnlyMiddleware,
} from "../middlewares/auth.middleware.js";

import {
  createListing,
  getAllListings,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
  toggleSaveListing,
  getSavedListings
} from "../controllers/pgListingController.js";

const router = express.Router();


// ─────────────────────────────
// PUBLIC ROUTES
// ─────────────────────────────

// Get all listings
router.get("/", getAllListings);
router.get(
  "/saved-listings",
  authMiddleware,
  getSavedListings
);

// Get single listing (must be ABOVE "/:id" conflicts avoided)
router.get("/:id", getListingById);


// ─────────────────────────────
// OWNER ROUTES
// ─────────────────────────────

// Create listing with images
router.post(
  "/",
  authMiddleware,
  ownerOnlyMiddleware,
  upload.array("photos", 10),
  createListing
);

// My listings
router.get(
  "/owner/my-listings",
  authMiddleware,
  ownerOnlyMiddleware,
  getMyListings
);

// Update listing
router.patch(
  "/:id",
  authMiddleware,
  ownerOnlyMiddleware,
  updateListing
);

// Delete listing
router.delete(
  "/:id",
  authMiddleware,
  ownerOnlyMiddleware,
  deleteListing
);


// ─────────────────────────────
// USER ROUTES
// ─────────────────────────────

// Save / Unsave listing
router.post(
  "/:id/save",
  authMiddleware,
  toggleSaveListing
);


export default router;