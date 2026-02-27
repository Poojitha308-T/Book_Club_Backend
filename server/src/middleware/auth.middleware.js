// src/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");
const authService = require("../modules/auth/auth.service");

// Middleware to verify JWT token and attach user to req
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Invalid token format" });

    // Check if token is blacklisted
    const blacklisted = await authService.isBlacklisted(token);
    if (blacklisted)
      return res.status(401).json({ success: false, message: "Token expired. Please login again." });

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

// Optional: Admin-only check
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }
  next();
};

// Optional: Allow only certain roles
const verifyRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Access denied." });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyRoles,
};