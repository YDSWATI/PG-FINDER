import User from "../models/user.model.js";
import { computeMatchScore } from "../utils/match.js";


// ─────────────────────────────────────────────
// GET ALL MATCHES
// GET /api/match
// Private
// ─────────────────────────────────────────────
const getMatches = async (req, res) => {
  try {

    const currentUser = await User.findById(req.user.id);

    // only seekers
    if (currentUser.role !== "seeker") {
      return res.status(400).json({
        success: false,
        message: "Only seekers can use matching",
      });
    }

    // find seekers from same city
    const users = await User.find({
      _id: { $ne: currentUser._id },
      role: "seeker",
      city: currentUser.city,
    });

    let matches = [];

    for (const user of users) {

      const result = computeMatchScore(
        currentUser,
        user
      );

      matches.push({
        user: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          city: user.city,
          budget: user.budget,
          habits: user.habits,
        },

        score: result.score,
        percentage: result.percentage,
        compatible: result.compatible,
      });
    }

    // sort by score descending
    matches.sort((a, b) => b.score - a.score);

    res.status(200).json({
      success: true,
      count: matches.length,
      matches,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ─────────────────────────────────────────────
// GET MATCH WITH SINGLE USER
// GET /api/match/:userId
// Private
// ─────────────────────────────────────────────
const getMatchWithUser = async (req, res) => {
  try {

    const currentUser = await User.findById(req.user.id);

    const targetUser = await User.findById(
      req.params.userId
    );

    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const result = computeMatchScore(
      currentUser,
      targetUser
    );

    res.status(200).json({
      success: true,

      targetUser: {
        _id: targetUser._id,
        name: targetUser.name,
        avatar: targetUser.avatar,
        city: targetUser.city,
        budget: targetUser.budget,
      },

      score: result.score,
      percentage: result.percentage,
      compatible: result.compatible,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export {
  getMatches,
  getMatchWithUser,
};