import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ─── Habits Sub-Schema ────────────────────────────────────────────────────────
// Filled during onboarding quiz after signup.
// Used by the matching algorithm to calculate compatibility %.
const habitsSchema = new mongoose.Schema(
  {
    sleepTime: {
      type: String,
      enum: ["early_bird", "night_owl", "flexible"],
    },

    foodPref: {
      type: String,
      enum: ["veg", "non_veg", "vegan", "no_preference"],
    },

    noiseLevel: {
      type: String,
      enum: ["silent", "moderate", "social"],
    },

    cleanliness: {
      type: String,
      enum: ["very_neat", "average", "relaxed"],
    },

    field: {
      type: String,
      enum: ["engineering", "medical", "mba", "arts", "law", "other"],
    },
  },
  { _id: false } 
);

// ─── User Schema ──────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Never returned in queries by default
    },

    role: {
      type: String,
      enum: ["seeker", "owner"],
      default: "seeker",
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"],
    },

    avatar: {
      type: String,
      default: "", // Cloudinary URL
    },

    budget: {
      min: {
        type: Number,
        default: 3000,
      },

      max: {
        type: Number,
        default: 15000,
      },
    },

    habits: {
      type: habitsSchema,
      default: {},
    },

    quizCompleted: {
      type: Boolean,
      default: false,
      // True once the user finishes the 5-step habit quiz
      // Used to redirect user to quiz if they skip it
    },

    savedListings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PGListing",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
      // Soft delete — set to false instead of deleting the document
    },
  },
  {
    timestamps: true, // createdAt + updatedAt auto-managed
  }
);

// ─── Hash password before saving ─────────────────────────────────────────────
userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);
});

// ─── Instance method: compare password ───────────────────────────────────────
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ─── Remove sensitive fields from JSON output ─────────────────────────────────
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.__v;

  return user;
};

// ─── Indexes ──────────────────────────────────────────────────────────────────
userSchema.index({ city: 1, role: 1 });
// Speeds up the matching query: "find all seekers in the same city"

const User = mongoose.model("User", userSchema);

export default User;