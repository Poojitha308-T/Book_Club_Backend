const recommendationService = require("./recommendations.service");

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware

    const data = await recommendationService.getRecommendations(userId);

    res.json({
      success: true,
      ...data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};