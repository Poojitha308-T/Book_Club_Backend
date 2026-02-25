const votingService = require("./voting.service");

/**
 * POST /api/voting
 */
exports.vote = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, vote } = req.body;

    if (!bookId || ![1, -1].includes(vote)) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const data = await votingService.addOrUpdateVote(userId, bookId, vote);
    res.json({ success: true, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * GET /api/voting?bookId=<id>
 */
exports.getVotes = async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const data = await votingService.getVotes(bookId);
    res.json({ success: true, ...data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};