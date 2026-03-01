const usersService = require("./users.service");
const supabase = require("../../config/supabaseClient");
const pool = require("../../config/db");

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

    // Optional: prevent admin from deleting themselves
    if (req.user.id === id) {
      return res.status(400).json({
        message: "You cannot delete yourself",
      });
    }

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

// // Update another user's role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    if (!role) {
      return res.status(400).json({
        message: "Role is required",
      });
    }

    // Optional: prevent admin from changing their own role
    if (req.user.id === id) {
      return res.status(400).json({
        message: "You cannot change your own role",
      });
    }

    const result = await pool.query(
      "UPDATE users SET role = $1 WHERE id = $2 RETURNING *",
      [role, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User role updated successfully",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Update Role Error:", error);
    res.status(500).json({
      message: "Failed to update role",
    });
  }
};