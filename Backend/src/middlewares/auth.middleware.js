
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
     console.log("TOKEN:", token);
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized — no token provided",
    });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request (excluding password)
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account has been deactivated",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized — invalid token",
    });
  }
};

// Use this to restrict routes to owners only
const ownerOnlyMiddleware = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({
      success: false,
      message: "Only PG owners can perform this action",
    });
  }
  next();
};

export { authMiddleware, ownerOnlyMiddleware };

