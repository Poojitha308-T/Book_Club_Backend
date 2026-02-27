const supabase = require("../../config/supabaseClient");

exports.getDashboardStats = async () => {
  const [
    usersRes,
    booksRes,
    reviewsRes,
    discussionsRes,
    votesRes
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("discussions").select("*", { count: "exact", head: true }),
    supabase.from("votes").select("*", { count: "exact", head: true })
  ]);

  // 🔥 Error handling
  if (usersRes.error) throw usersRes.error;
  if (booksRes.error) throw booksRes.error;
  if (reviewsRes.error) throw reviewsRes.error;
  if (discussionsRes.error) throw discussionsRes.error;
  if (votesRes.error) throw votesRes.error;

  return {
    totalUsers: usersRes.count || 0,
    totalBooks: booksRes.count || 0,
    totalReviews: reviewsRes.count || 0,
    totalDiscussions: discussionsRes.count || 0,
    totalVotes: votesRes.count || 0
  };
};