import mongoose from "mongoose";

// ─── PG Listing Schema ────────────────────────────────────────────────────────
const pgListingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Listing title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
      // e.g. "Sunshine PG for Boys near Koramangala Metro"
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },

    // ── Location ──────────────────────────────────────────────────────────────
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      index: true,
      // e.g. "Bengaluru" — indexed for fast city-based search
    },

    pincode: {
        type: String,
        trim: true,
        match: [/^\d{6}$/, "Invalid pincode"],
    },

    address: {
      type: String,
      trim: true,
      // Full address shown only to saved/interested seekers
    },

    state: {
        type: String,
        required: [true, "State is required"],
        index: true,
        trim: true,
    },

    // ── Pricing ───────────────────────────────────────────────────────────────
    rent: {
      type: Number,
      required: [true, "Rent is required"],
      index: true,
      min: [1000, "Rent must be at least ₹1000"],
      // Monthly rent in INR
    },

    deposit: {
      type: Number,
      default: 0,
      // Security deposit amount in INR
    },

    // ── Room details ──────────────────────────────────────────────────────────
    roomType: {
      type: String,
      enum: ["single", "double", "triple"],
      required: [true, "Room type is required"],
    },

    genderPreference: {
      type: String,
      enum: ["boys", "girls", "any"],
      default: "any",
      index: true,
    },

    availableRooms: {
      type: Number,
      default: 1,
      min: 0,
    },

    // ── Amenities ─────────────────────────────────────────────────────────────
    amenities: {
      wifi: { type: Boolean, default: false },
      food: { type: Boolean, default: false },
      ac: { type: Boolean, default: false },
      laundry: { type: Boolean, default: false },
      parking: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
      housekeeping: { type: Boolean, default: false },
      powerBackup: { type: Boolean, default: false },
      hotWater: { type: Boolean, default: false },
      cctv: { type: Boolean, default: false },
    },

    // ── Rules ─────────────────────────────────────────────────────────────────
    rules: {
      smokingAllowed: { type: Boolean, default: false },
      nonVegAllowed: { type: Boolean, default: true },
      guestsAllowed: { type: Boolean, default: false },
      curfewTime: {
        type: String,
        default: "",
        // e.g. "10:00 PM" — empty means no curfew
      },
    },

    // ── Photos ────────────────────────────────────────────────────────────────
    photos: {
        type: [
            {
            url: { type: String, required: true },
            publicId: { type: String, required: true },
            },
        ],
        default: [],
    },

    // ── Stats ─────────────────────────────────────────────────────────────────
    savedBy: {
        type: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
        ],
        default: [],
    },

   
    isActive: {
      type: Boolean,
      default: true,
      // Owner can deactivate without deleting
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// ─── Virtual: save count ──────────────────────────────────────────────────────
pgListingSchema.virtual("saveCount").get(function () {
  return this.savedBy ? this.savedBy.length : 0;
});

// ─── Indexes ──────────────────────────────────────────────────────────────────


pgListingSchema.index({ city: 1, rent: 1 });
// Speeds up search + sort by price within a city

pgListingSchema.index({ city: 1, genderPreference: 1, roomType: 1 });
// Speeds up filtered search

export const PGListing = mongoose.model("PGListing", pgListingSchema);