const Book = require("../models/Book");
const Review = require("../models/Review");
const Library = require("../models/Library");
const BookActions = require("../models/BookActions");

class bookController {
  async createBook(req, res) {
    try {
      const { title, img, author, genre, count } = req.body;

      const bookOne = await Book.findOne({
        title,
      });

      if (bookOne) {
        return res
          .status(400)
          .json({ message: "This book has already been created" });
      }

      const book = new Book({
        title,
        img,
        count,
        author: author._id,
        genre: [genre._id],
      });

      await book.save();
      return res.json({ message: "Book has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create book error" });
    }
  }

  async getBooks(req, res) {
    try {
      // const books = await Book.find().populate("author").populate("genre");

      const books = await Book.aggregate([
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },

        { $unwind: "$author" },

        {
          $lookup: {
            from: "genres",
            localField: "genre",
            foreignField: "_id",
            as: "genre",
          },
        },

        { $unwind: "$genre" },

        // {
        //   $lookup: {
        //     from: "libraries",
        //     // let: { bookID: "$_id" },
        //     localField: "libraries",
        //     foreignField: "book._id",
        //     // pipeline: [
        //     //   {
        //     //     $match: {
        //     //       $expr: { $eq: ["$book._id", "$$bookID"] },
        //     //     },
        //     //   },

        //     // ],
        //     as: "libraries",
        //   },
        // },

        {
          $lookup: {
            from: "libraries",
            let: { id: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$$id", "$book._id"] },
                },
              },
              { $count: "count" },
            ],
            as: "count",
          },
        },

        // { $addFields: {
        //   "linkCount": { "$sum": "$linkCount.count" }
        // }}
      ]);

      res.json(books);
    } catch (e) {
      console.log(e);
    }
  }

  async updateBook(req, res) {
    const { id } = req.params;
    try {
      const { author, genre } = req.body;

      await Book.findOneAndUpdate(
        { _id: id },
        { ...req.body, author: author._id, genre: [genre._id] },
        { new: true, useFindAndModify: false }
      );
      res.json({
        message: "Book was updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot update book with id: ${id}` });
    }
  }

  async deleteBook(req, res) {
    const { id } = req.params;
    try {
      const bookAction = await BookActions.findOne({ book: id });
      const review = await Review.findOne({ book: id });

      if (!bookAction && !review) {
        const book = await Book.findByIdAndDelete({ _id: id });
        return res.json({
          message: `${book.title} were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Book can't be deleted. This entry is linked to other schemes!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete book with id ${id}` });
    }
  }

  async deleteManyBooks(req, res) {
    try {
      const { ids } = req.body;
      const bookAction = await BookActions.findOne({ book: { $in: ids } });
      const review = await Review.findOne({ book: { $in: ids } });

      if (!bookAction && !review) {
        await Book.deleteMany({
          _id: { $in: ids },
        });
        return res.json({
          message: `Books with ids [${ids}] were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Book can't be deleted. This entry is linked to other schemes!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete books` });
    }
  }

  getBooksWhichNotReturned;
}

module.exports = new bookController();
