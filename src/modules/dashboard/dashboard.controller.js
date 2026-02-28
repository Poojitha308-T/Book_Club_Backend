const dashboardService = require("./dashboard.service");

exports.getDashboard = async (req, res) => {
  try {
    console.log("DEBUG: req.user in controller:", req.user);

    const dashboardData = await dashboardService.getDashboardStats();

    res.json({
      success: true,
      data: dashboardData,
    });

  } catch (error) {
    console.error("Dashboard Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const data = await dashboardService.getUsers();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const data = await dashboardService.getBooks();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const data = await dashboardService.getProgress();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const data = await dashboardService.getGoals();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getReports = async (req, res) => {
  try {
    const data = await dashboardService.getReports();
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};