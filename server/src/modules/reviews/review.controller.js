const reviewService = require("./review.service");

exports.addReview = async (req, res) => {
  try {
    const review = await reviewService.addReview({
      bookId: req.params.bookId,
      userId: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

exports.getReviewsByBook = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByBook(
      req.params.bookId
    );

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};