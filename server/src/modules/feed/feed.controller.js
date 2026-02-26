const supabase = require("../../config/supabaseClient");

exports.getFeed = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Get users that current user follows
    const { data: followingData, error: followError } = await supabase
      .from("follows")
      .select("following_id")
      .eq("follower_id", userId);

    if (followError) throw followError;

    const followingIds = followingData.map(f => f.following_id);

    if (followingIds.length === 0) {
      return res.json({
        success: true,
        feed: []
      });
    }

    // 2️⃣ Get reviews from followed users
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select(`
        id,
        comment,
        rating,
        created_at,
        users(id, name),
        books(id, title)
      `)
      .in("user_id", followingIds)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) throw error;

    res.json({
      success: true,
      feed: reviews
    });

  } catch (error) {
    console.error("Feed error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};