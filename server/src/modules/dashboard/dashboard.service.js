const supabase = require("../../config/supabaseClient");

exports.getDashboardStats = async () => {
  const [
    users,
    books,
    reviews,
    discussions,
    votes
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("reviews").select("*", { count: "exact", head: true }),
    supabase.from("discussions").select("*", { count: "exact", head: true }),
    supabase.from("votes").select("*", { count: "exact", head: true })
  ]);

  return {
    totalUsers: users.count || 0,
    totalBooks: books.count || 0,
    totalReviews: reviews.count || 0,
    totalDiscussions: discussions.count || 0,
    totalVotes: votes.count || 0
  };
};