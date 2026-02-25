const bookService = require("./book.service");
const supabase = require("../../config/supabaseClient");

exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body, req.user.id);

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase
      .from("books")
      .select("*", { count: "exact" });

    // 🔍 Search filter
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    res.json({
      success: true,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
      books: data
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(
      req.params.id,
      req.body
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};