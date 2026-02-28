const supabase = require("../../config/supabaseClient");

exports.likeReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    const { error } = await supabase
      .from("review_likes")
      .insert({
        review_id: reviewId,
        user_id: userId
      });

    if (error) {
      if (error.code === "23505") {
        return res.status(400).json({
          success: false,
          message: "Already liked"
        });
      }
      throw error;
    }

    res.json({
      success: true,
      message: "Review liked successfully"
    });

  } catch (error) {
    console.error("Like error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.unlikeReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;

    const { error } = await supabase
      .from("review_likes")
      .delete()
      .eq("review_id", reviewId)
      .eq("user_id", userId);

    if (error) throw error;

    res.json({
      success: true,
      message: "Review unliked successfully"
    });

  } catch (error) {
    console.error("Unlike error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};