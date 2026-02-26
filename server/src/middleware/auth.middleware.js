const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", req.user.id)
      .single();

    if (error || !data) {
      return res.status(403).json({
        success: false,
        message: "Access denied."
      });
    }

    if (data.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only."
      });
    }

    next();

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  verifyToken,
  verifyAdmin
};