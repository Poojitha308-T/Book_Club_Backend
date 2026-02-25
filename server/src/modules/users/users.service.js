const supabase = require("../../config/supabaseClient");

exports.getUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, avatar_url, role, created_at")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};

exports.updateUser = async (userId, updates) => {
  const allowedFields = ["name", "avatar_url"];

  const filteredUpdates = {};
  allowedFields.forEach(field => {
    if (updates[field]) filteredUpdates[field] = updates[field];
  });

  const { data, error } = await supabase
    .from("users")
    .update(filteredUpdates)
    .eq("id", userId)
    .select("id, name, email, avatar_url, role, created_at")
    .single();

  if (error) throw error;

  return data;
};

exports.getPublicUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, avatar_url, created_at")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
};