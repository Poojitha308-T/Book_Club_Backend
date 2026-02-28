const usersService = require("./users.service");
const supabase = require("../../config/supabaseClient");

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await usersService.getUserById(req.user.id);

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
  // console.log("Decoded token:", req.user);
};

exports.updateCurrentUser = async (req, res) => {
  try {
    const updatedUser = await usersService.updateUser(req.user.id, req.body);

    res.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await usersService.getPublicUserById(req.params.id);

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, role, created_at");

    if (error) throw error;

    res.json({
      success: true,
      users: data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM users WHERE id = $1", [id]);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};