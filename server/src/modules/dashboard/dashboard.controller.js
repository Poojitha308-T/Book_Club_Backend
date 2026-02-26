const dashboardService = require("./dashboard.service");

exports.getDashboard = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};