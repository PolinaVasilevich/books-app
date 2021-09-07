const mongoose = require("mongoose");

const Review = require("../models/Review");
const Book = require("../models/Book");

class reviewController {
  async createReview(req, res) {
    try {
      const { book, user, text, rating } = req.body;

      const review = new Review({
        text,
        book: book._id,
        user: user._id,
        rating,
      });

      await review.save();

      const data = await Review.aggregate([
        {
          $match: {
            book: new mongoose.Types.ObjectId(book._id),
            rating: { $gte: 1 },
          },
        },

        {
          $group: {
            _id: "$book",
            ratingAvg: { $avg: "$rating" },
          },
        },

        {
          $project: {
            _id: 0,
            ratingAvg: { $ceil: "$ratingAvg" },
          },
        },
      ]);

      await Book.findByIdAndUpdate(
        { _id: book._id },
        {
          $set: {
            rating: data[0].ratingAvg,
          },
        },
        { new: true, useFindAndModify: false }
      );

      return res.json({
        message: `Review has created successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Create review error" });
    }
  }

  async getReviews(req, res) {
    try {
      const reviews = await Review.find()
        .populate("user")
        .populate({ path: "book", populate: ["author", "genre"] })
        .sort({ created_date: -1 });
      res.json(reviews);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserReviews(req, res) {
    try {
      const { bookid, userid } = req.params;
      const reviews = await Review.find({
        book: bookid,
        user: userid,
      })
        .populate("user")
        .populate({ path: "book", populate: ["author", "genre"] });
      res.json(reviews);
    } catch (error) {
      console.log(error);
    }
  }

  async getReviewsBook(req, res) {
    const { id } = req.params;
    try {
      const reviews = await Review.find({ book: id })
        .populate("user")
        .populate({ path: "book", populate: ["author", "genre"] });

      res.json(reviews);
    } catch (error) {
      console.log(error);
    }
  }

  async updateReview(req, res) {
    const { id } = req.params;
    try {
      const { user, book } = req.body;

      await Review.findOneAndUpdate(
        { _id: id },
        {
          ...req.body,
          user: user._id,
          book: [book._id],
          edit_date: Date.now(),
        },
        { new: true, useFindAndModify: false }
      );

      res.json({
        message: "Review book was updated successfully",
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: `Cannot update review book with id: ${id}` });
    }
  }

  async deleteReview(req, res) {
    const { id } = req.params;
    try {
      await Review.findByIdAndDelete({ _id: id });
      return res.json({
        message: `$Review with id {id} were deleted successfully!`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete review with id ${id}` });
    }
  }
}

module.exports = new reviewController();
