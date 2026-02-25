const goalsService = require("./goals.service");

// Create a new goal
exports.createGoal = async (req, res) => {
  try {
    const userId = req.user.id;
    const { targetBooks, targetPages, startDate, endDate } = req.body;

    if (!targetBooks && !targetPages || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const goal = await goalsService.createGoal(userId, targetBooks || 0, targetPages || 0, startDate, endDate);
    res.json({ success: true, goal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create goal" });
  }
};

// Update completed progress
exports.updateGoalProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { goalId, completedBooks = 0, completedPages = 0 } = req.body;

    if (!goalId) return res.status(400).json({ success: false, message: "Missing goalId" });

    const goal = await goalsService.updateGoalProgress(userId, goalId, completedBooks, completedPages);
    res.json({ success: true, goal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update goal progress" });
  }
};

// Get all goals
exports.getUserGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const goals = await goalsService.getUserGoals(userId);
    res.json({ success: true, goals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch goals" });
  }
};

// Get a specific goal
exports.getGoalById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { goalId } = req.query;

    if (!goalId) return res.status(400).json({ success: false, message: "Missing goalId" });

    const goal = await goalsService.getGoalById(userId, goalId);
    res.json({ success: true, goal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch goal" });
  }
};