const supabase = require("../../config/supabaseClient");

exports.getDashboardStats = async () => {

  const [
    users,
    books,
    reviews,
    follows,
    likes
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("follows").select("*", { count: "exact", head: true }),
    supabase.from("review_likes").select("*", { count: "exact", head: true })
  ]);

  return {
    totalUsers: users.count || 0,
    totalBooks: books.count || 0,
    totalReviews: reviews.count || 0,
    totalFollows: follows.count || 0,
    totalLikes: likes.count || 0
  };
};