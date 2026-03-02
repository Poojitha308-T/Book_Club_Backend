const achievementsService = require("./achievements.service");

exports.createAchievement = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required"
      });
    }

    const achievement = await achievementService.createAchievement({ name, description });

    res.status(201).json({
      success: true,
      data: achievement
    });

  } catch (error) {
    console.error("Create Achievement Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// Get all achievements in the system
exports.getAchievements = async (req, res) => {
  try {
    const data = await achievementsService.getAllAchievements();
    res.json({ success: true, data });
  } catch (err) {
    console.error("Achievements Controller Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get achievements earned by the logged-in user
exports.getUserAchievements = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await achievementsService.getUserAchievements(userId);
    res.json({ success: true, data });
  } catch (err) {
    console.error("User Achievements Controller Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Assign an achievement to a user (admin only)
exports.addUserAchievement = async (req, res) => {
  try {
    const { userId, achievementId } = req.body;

    // ✅ Validate inputs
    if (!userId || !achievementId) {
      return res.status(400).json({
        success: false,
        message: "Both userId and achievementId are required",
      });
    }

    // Call service to insert achievement
    const data = await achievementsService.addUserAchievement(userId, achievementId);

    // Check if the user already has this achievement
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Achievement already earned by this user",
      });
    }

    // Success
    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error("Add User Achievement Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};