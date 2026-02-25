const recommendationService = require("./recommendations.service");

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const data = await recommendationService.getRecommendations(userId, limit, page);

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