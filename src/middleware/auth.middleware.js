const jwt = require("jsonwebtoken");
const authService = require("../modules/auth/auth.service");

/**
 * Middleware to verify JWT token and attach user info to req.user
 */
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format" });
    }
    const token = tokenParts[1];

    // Check blacklist
    const blacklisted = await authService.isBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // Attach user info to request
    next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * Middleware to allow only admins
 */
const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Access denied. Admins only." });
  }
  next();
};

/**
 * Middleware to allow only certain roles
 * Example usage: verifyRoles('admin', 'moderator')
 */
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyRoles,
};
