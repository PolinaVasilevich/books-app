const mongoose = require("mongoose");
const crypto = require("crypto");

const BookActions = require("../models/BookActions");
const Book = require("../models/Book");

class bookController {
  async getAllBookActions(req, res) {
    try {
      const bookActions = await BookActions.find()
        .populate("user")
        .populate("userAction")
        .populate({ path: "book", populate: ["author", "genre"] })
        .sort({ action_date: -1 });

      res.json(bookActions);
    } catch (error) {
      console.log(error);
    }
  }

  async reserveBook(req, res) {
    try {
      const { user, book } = req.body;

      if (!book.count) {
        return res.status(400).send({ message: "The book is out of stock. " });
      }

      // const reservedBook = await BookActions.findOne({
      //   user: user._id,
      //   book: book._id,
      // });

      // if (reservedBook && reservedBook.status === "Reserved") {
      //   return res
      //     .status(400)
      //     .send({ message: "You have already reserved this book" });
      // }

      const reservation_number = crypto.randomBytes(8).toString("hex");

      const bookAction = new BookActions({
        book,
        user,
        userAction: user,
        reservation_number,
        status: "Reserved",
        action_date: Date.now(),
      });

      await Book.findOneAndUpdate(
        { _id: book._id },
        {
          $set: {
            count: book.count - 1,
          },
        },

        { new: true, useFindAndModify: false }
      );

      await bookAction.save();

      return res.json({
        message: `${bookAction.book.title} has reserved successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot reserved book` });
    }
  }

  async giveOutBook(req, res) {
    try {
      const { user, book, userAction, return_date, reservation_number } =
        req.body;
      const bookAction = new BookActions({
        book,
        user,
        userAction,
        return_date,
        reservation_number,
        status: "Received",
        action_date: Date.now(),
      });

      await bookAction.save();

      return res.json({
        message: `${bookAction.book.title} has received successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot receive book` });
    }
  }

  async returnBook(req, res) {
    try {
      const { user, book, userAction } = req.body;

      const bookAction = new BookActions({
        book: book,
        user: user,
        userAction: userAction,
        status: "Returned",
        isActual: false,
        action_date: Date.now(),
      });

      await BookActions.updateMany(
        { book: book._id, user: user._id, isActual: true },
        {
          $set: { isActual: false },
          $currentDate: { lastModified: true },
        }
      );

      await Book.findOneAndUpdate(
        { _id: book._id },
        {
          $set: {
            count: book.count + 1,
          },
        },

        { new: true, useFindAndModify: false }
      );

      await bookAction.save();

      return res.json({
        message: `${bookAction.book.title} has returned successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot return book` });
    }
  }

  async cancelBook(req, res) {
    try {
      const { user, book, userAction } = req.body;

      const bookAction = new BookActions({
        book,
        user,
        userAction: userAction,
        status: "Canceled",
        isActual: false,
        action_date: Date.now(),
      });

      await BookActions.updateMany(
        { book: book._id, user: user._id, isActual: true },
        {
          $set: { isActual: false },
          $currentDate: { lastModified: true },
        }
      );

      await Book.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(book._id) },
        {
          $set: {
            count: book.count + 1,
          },
        },

        { new: true, useFindAndModify: false }
      );

      await bookAction.save();

      return res.json({
        message: `${bookAction.book.title} has received successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot receive book` });
    }
  }
}
///END DELETE///

module.exports = new bookController();
