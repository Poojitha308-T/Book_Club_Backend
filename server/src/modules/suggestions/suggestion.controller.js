
const pool = require("../../config/db");
const {
  createSuggestionDB,
  getSuggestionsDB,
  incrementVoteCountDB,
  approveSuggestionDB,
} = require("./suggestion.model");

const { addVoteDB } = require("../suggestion_votes/suggestionVotes.model");

// 1️⃣ Create Suggestion
const createSuggestion = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    const userId = req.user.id;

    const suggestion = await createSuggestionDB(title, author, description, userId);
    res.status(201).json(suggestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create suggestion" });
  }
};

// 2️⃣ Get Suggestions
const getSuggestions = async (req, res) => {
  try {
    const suggestions = await getSuggestionsDB();
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch suggestions" });
  }
};

// 3️⃣ Vote Suggestion
const voteSuggestion = async (req, res) => {
  const suggestionId = req.params.id;
  const userId = req.user.id;

  try {
    await pool.query("BEGIN");

    // Add vote
    await addVoteDB(userId, suggestionId);

    // Increment vote count
    await incrementVoteCountDB(suggestionId);

    await pool.query("COMMIT");

    res.json({ message: "Vote added successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");

    if (error.code === "23505") {
      return res.status(400).json({ message: "You already voted" });
    }

    console.error(error);
    res.status(500).json({ message: "Voting failed" });
  }
};

// 4️⃣ Approve Suggestion (Admin only)
const approveSuggestion = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    const suggestionId = req.params.id;

    await pool.query("BEGIN");

    // Insert into books table
    await pool.query(
      `INSERT INTO books (title, author, description, created_by)
       SELECT title, author, description, suggested_by
       FROM book_suggestions
       WHERE id = $1`,
      [suggestionId]
    );

    // Update suggestion status
    await approveSuggestionDB(suggestionId);

    await pool.query("COMMIT");

    res.json({ message: "Suggestion approved and book added" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ message: "Approval failed" });
  }
};

module.exports = {
  createSuggestion,
  getSuggestions,
  voteSuggestion,
  approveSuggestion,
};