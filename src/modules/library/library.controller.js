const libraryService = require("./library.service");

// Add book
exports.addBookToLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId, status } = req.body; // <-- get status from frontend

    if (!bookId)
      return res.status(400).json({ success: false, message: "Missing bookId" });

    // Pass status to service
    const book = await libraryService.addBookToLibrary(userId, bookId, status || "to_read");

    if (!book)
      return res.json({ success: true, message: "Book already in library" });

    res.json({ success: true, book });
  } catch (err) {
    console.error("Library add error:", err);
    res.status(500).json({ success: false, message: "Failed to add book" });
  }
};
// Remove book
exports.removeBook = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId)
      return res.status(400).json({ success: false, message: "Missing bookId" });

    const book = await libraryService.removeBookFromLibrary(userId, bookId);
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found in library" });

    res.json({ success: true, book });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to remove book" });
  }
};

// Get user library
exports.getUserLibrary = async (req, res) => {
  try {
    const userId = req.user.id;
    const library = await libraryService.getUserLibrary(userId);
    res.json({ success: true, library });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch library" });
  }
};