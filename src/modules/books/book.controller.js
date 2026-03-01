const bookService = require("./book.service");
const supabase = require("../../config/supabaseClient");
const allowedSortFields = ["created_at", "title", "rating"];

exports.createBook = async (req, res) => {
  try {
    const { title, author, description, genre, rating, image_url } = req.body;

    const book = await bookService.createBook(
      { title, author, description, genre, rating, image_url },
      req.user.id
    );

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
    let {
      page = 1,
      limit = 10,
      search = "",
      sort = "created_at",
      order = "desc",
      genre,
      minRating,
    } = req.query;

    page = parseInt(page);
    limit = Math.min(parseInt(limit), 50); // safety limit

    const from = (page - 1) * limit;
    const to = page * limit - 1;

    let query = supabase.from("books").select("*", { count: "exact" });

    // 🔍 Search (title or author)
    if (search) {
      query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%`);
    }

    // 🎭 Filter by genre
    if (genre) {
      query = query.eq("genre", genre);
    }

    // ⭐ Filter by minimum rating
    if (minRating) {
      query = query.gte("rating", minRating);
    }

    if (!allowedSortFields.includes(sort)) {
      sort = "created_at";
    }

    // 🔄 Sorting
    query = query.order(sort, { ascending: order === "asc" });

    // 📄 Pagination
    const { data, error, count } = await query.range(from, to);

    if (error) throw error;

    const totalPages = count === 0 ? 1 : Math.ceil(count / limit);

    res.json({
      success: true,
      page,
      limit,
      total: count,
      totalPages,
      books: data,
    });
  } catch (error) {
    console.error("Books fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
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
    const book = await bookService.updateBook(req.params.id, req.body);

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


exports.getTopVotedBooks = async (req, res) => {
  try {
    const topBooks = await bookService.getTopVotedBooks(); // implement in service
    res.json({ success: true, data: topBooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};