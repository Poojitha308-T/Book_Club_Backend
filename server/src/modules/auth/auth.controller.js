const authService = require("./auth.service");

exports.register = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 👈 ADD THIS

    const response = await authService.register(req.body);

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const response = await authService.login(req.body); // ✅ PASS req.body

    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};