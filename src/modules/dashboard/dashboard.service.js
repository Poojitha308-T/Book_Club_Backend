const supabase = require("../../config/supabaseClient");

exports.getDashboardStats = async () => {
  try {
    const [
      usersRes,
      booksRes,
      reviewsRes,
      discussionsRes,
      votesRes,
      meetingsRes,
      upcomingMeetingsRes,
      achievementsRes,
      userAchievementsRes // ✅ for earned achievements
    ] = await Promise.all([
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("books").select("*", { count: "exact", head: true }),
      supabase.from("reviews").select("*", { count: "exact", head: true }),
      supabase.from("discussions").select("*", { count: "exact", head: true }),
      supabase.from("votes").select("*", { count: "exact", head: true }),

      // ✅ TOTAL MEETINGS
      supabase.from("meetings").select("*", { count: "exact", head: true }),

      // ✅ UPCOMING MEETINGS (FIXED COLUMN NAME)
      supabase
        .from("meetings")
        .select("*")
        .gte("scheduled_at", new Date().toISOString()) // 🔥 FIXED
        .order("scheduled_at", { ascending: true })
        .limit(5),

      // ✅ TOTAL ACHIEVEMENTS
      supabase.from("achievements").select("*", { count: "exact", head: true }),

      // ✅ USER ACHIEVEMENTS (earned)
      supabase.from("user_achievements").select("*", { count: "exact", head: true })
    ]);

    // 🔥 Proper error handling (very important)
    if (usersRes.error) throw usersRes.error;
    if (booksRes.error) throw booksRes.error;
    if (reviewsRes.error) throw reviewsRes.error;
    if (discussionsRes.error) throw discussionsRes.error;
    if (votesRes.error) throw votesRes.error;
    if (meetingsRes.error) throw meetingsRes.error;
    if (upcomingMeetingsRes.error) throw upcomingMeetingsRes.error;
    if (achievementsRes.error) throw achievementsRes.error;
    if (userAchievementsRes.error) throw userAchievementsRes.error;

    return {
      totalUsers: usersRes.count || 0,
      totalBooks: booksRes.count || 0,
      totalReviews: reviewsRes.count || 0,
      totalDiscussions: discussionsRes.count || 0,
      totalVotes: votesRes.count || 0,

      // ✅ MEETINGS
      totalMeetings: meetingsRes.count || 0,
      upcomingMeetings: upcomingMeetingsRes.data || [],

      // ✅ ACHIEVEMENTS
      totalAchievements: achievementsRes.count || 0,
      earnedAchievements: userAchievementsRes.count || 0
    };

  } catch (error) {
    console.error("🔥 Dashboard Service Error:", error.message);
    throw error;
  }
};