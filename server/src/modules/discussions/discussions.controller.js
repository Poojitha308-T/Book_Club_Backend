const discussionService = require("./discussions.service");

// Create a new thread
exports.createThread = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, title } = req.body;
    if (!bookId || !title)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const thread = await discussionService.createThread(userId, bookId, title);
    res.json({ success: true, thread });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create thread" });
  }
};

// Get threads by book
exports.getThreadsByBook = async (req, res) => {
  try {
    const { bookId, limit, page } = req.query;
    const threads = await discussionService.getThreadsByBook(
      bookId,
      parseInt(limit) || 10,
      ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10)
    );
    res.json({ success: true, threads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch threads" });
  }
};

// Add a comment to a thread
exports.addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { threadId, content, parentId } = req.body;
    if (!threadId || !content)
      return res.status(400).json({ success: false, message: "Missing fields" });

    const comment = await discussionService.addComment(
      userId,
      threadId,
      content,
      parentId || null
    );
    res.json({ success: true, comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add comment" });
  }
};

// Get comments for a thread
exports.getComments = async (req, res) => {
  try {
    const { threadId, limit, page } = req.query;
    const comments = await discussionService.getComments(
      threadId,
      parseInt(limit) || 10,
      ((parseInt(page) || 1) - 1) * (parseInt(limit) || 10)
    );
    res.json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
};