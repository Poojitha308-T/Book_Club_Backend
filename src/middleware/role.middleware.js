
const allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log("DEBUG: req.user:", req.user);
    console.log("DEBUG: Allowed roles:", roles);
    
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }
    next();
  };
};

module.exports = allowRoles;