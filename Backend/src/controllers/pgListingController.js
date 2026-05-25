import { PGListing } from "../models/pgListing.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


// ─────────────────────────────
// CREATE LISTING
// ─────────────────────────────
const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      state,
      pincode,
      address,
      rent,
      deposit,
      roomType,
      genderPreference,
      amenities,
      rules,
    } = req.body;

    

let photos = [];
////Process each uploaded file
try {
  if (!req.files || req.files.length === 0) {
    console.log("No files received from multer");
  } else {
    for (const file of req.files) {
      try {
        if (!file?.path) {
          console.warn("Skipping invalid file:", file);
          continue;
        }

        const uploaded = await uploadOnCloudinary(file.path);

        if (!uploaded) {
          console.warn("Cloudinary upload failed for:", file.path);
          continue;
        }

        photos.push({
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
        });

      } catch (uploadErr) {
        console.error("Error uploading single file:", uploadErr.message);
      }
    }
  }
} catch (err) {
  console.error("Unexpected file processing error:", err);
  return res.status(500).json({
    success: false,
    message: "Error while processing images",
  });
}



    const listing = await PGListing.create({
      title,
      description,
      city,
      state,
      pincode,
      address,
      rent,
      deposit,
      roomType,
      genderPreference,
      amenities: amenities ? JSON.parse(amenities) : {},
      rules: rules ? JSON.parse(rules) : {},
      photos,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ─────────────────────────────
// GET ALL LISTINGS (with filters)
// ─────────────────────────────
const getAllListings = async (req, res) => {
  try {

    const {
      city,
      minRent,
      maxRent,
      genderPreference,
      roomType,
    } = req.query;

    const filter = {
      isActive: true,
    };

    // city
    if (city && city.trim() !== "") {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    // rent
    if (minRent || maxRent) {

      filter.rent = {};

      if (minRent) {
        filter.rent.$gte = Number(minRent);
      }

      if (maxRent) {
        filter.rent.$lte = Number(maxRent);
      }
    }

    // gender
    if (genderPreference) {
      filter.genderPreference = genderPreference;
    }

    // room type
    if (roomType) {
      filter.roomType = roomType;
    }

    const listings = await PGListing.find(filter)
      .populate("owner", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      listings,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ─────────────────────────────
// GET SINGLE LISTING
// ─────────────────────────────
const getListingById = async (req, res) => {
  try {
    const listing = await PGListing.findById(req.params.id)
      .populate("owner", "name avatar phone");

    if (!listing || !listing.isActive) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.json({
      success: true,
      listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ─────────────────────────────
// GET MY LISTINGS
// ─────────────────────────────
const getMyListings = async (req, res) => {
  try {
    const listings = await PGListing.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      listings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ─────────────────────────────
// UPDATE LISTING
// ─────────────────────────────
const updateListing = async (req, res) => {
  try {
    const listing = await PGListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    const updated = await PGListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      listing: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ─────────────────────────────
// DELETE LISTING (soft delete)
// ─────────────────────────────
const deleteListing = async (req, res) => {
  try {
    const listing = await PGListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    listing.isActive = false;
    await listing.save();

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ─────────────────────────────
// SAVE / UNSAVE LISTING
// ─────────────────────────────
const toggleSaveListing = async (req, res) => {
  try {
    const listing = await PGListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }

    const userId = req.user.id;

    const alreadySaved = listing.savedBy.some(
      (id) => id.toString() === userId
    );

    if (alreadySaved) {
      listing.savedBy.pull(userId);

      await User.findByIdAndUpdate(userId, {
        $pull: { savedListings: listing._id },
      });
    } else {
      listing.savedBy.push(userId);

      await User.findByIdAndUpdate(userId, {
        $addToSet: { savedListings: listing._id },
      });
    }

    await listing.save();

    res.json({
      success: true,
      saved: !alreadySaved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createListing,
  getAllListings,
  getListingById,
  getMyListings,
  updateListing,
  deleteListing,
  toggleSaveListing,
};