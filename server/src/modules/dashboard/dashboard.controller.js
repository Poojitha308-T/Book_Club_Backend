const dashboardService = require("./dashboard.service");

const getDashboard = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  getDashboard
};