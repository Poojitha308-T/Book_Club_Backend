const progressService = require("./progress.service");

// Add or update progress
exports.addOrUpdateProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, progressPercent } = req.body;

    if (!bookId || progressPercent === undefined)
      return res.status(400).json({ success: false, message: "Missing fields" });

    if (progressPercent < 0 || progressPercent > 100)
      return res.status(400).json({ success: false, message: "progressPercent must be 0-100" });

    const progress = await progressService.addOrUpdateProgress(userId, bookId, progressPercent);
    res.json({ success: true, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add/update progress" });
  }
};

// Get all progress for a user
exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await progressService.getUserProgress(userId);
    res.json({ success: true, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch progress" });
  }
};

// Get progress for a specific book
exports.getBookProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.query;

    if (!bookId) return res.status(400).json({ success: false, message: "Missing bookId" });

    const progress = await progressService.getBookProgress(userId, bookId);
    res.json({ success: true, progress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch book progress" });
  }
};