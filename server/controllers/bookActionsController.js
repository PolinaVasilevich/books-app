const mongoose = require("mongoose");
const crypto = require("crypto");

const BookActions = require("../models/BookActions");
const Book = require("../models/Book");
const reservedBooksController = require("../controllers/reservedBooksController");
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
        message: `${book.title} has returned successfully!`,
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

  async getNotReturnedBooksUser(req, res) {
    const { userID } = req.params;

    try {
      const books = await BookActions.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userID),
            isActual: true,
          },
        },

        {
          $group: {
            _id: "$book",
            book: { $first: "$book" },
            user: { $first: "$user" },
            last_action: { $last: "$action_date" },
            return_date: { $last: "$return_date" },
            reservation_number: { $first: "$reservation_number" },
            details: {
              $push: {
                status: "$status",
                action_date: "$action_date",
                isActual: "$isActual",
                return_date: "$return_date",
              },
            },
          },
        },
        { $sort: { return_date: 1 } },

        {
          $addFields: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$return_date",
              },
            },
            today: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: new Date(),
              },
            },
          },
        },

        {
          $addFields: {
            notToday: { $cmp: ["$date", "$today"] },
          },
        },

        {
          $match: {
            $and: [
              {
                return_date: {
                  $lt: new Date(),
                },
              },

              { notToday: { $ne: 0 } },
            ],
          },
        },

        {
          $lookup: {
            from: "books",
            let: { bookObjId: { $toObjectId: "$book" } },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$bookObjId"] } } }],
            as: "book",
          },
        },

        { $unwind: "$book" },

        {
          $lookup: {
            from: "authors",
            localField: "book.author",
            foreignField: "_id",
            as: "book.author",
          },
        },

        { $unwind: "$book.author" },

        {
          $lookup: {
            from: "genres",
            localField: "book.genre",
            foreignField: "_id",
            as: "book.genre",
          },
        },

        { $unwind: "$book.genre" },

        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },

        { $unwind: "$user" },
      ]);

      res.json(books);
    } catch (e) {
      console.log(e);
    }
  }

  async getReturnTodayBooks(req, res) {
    const { userID } = req.params;
    try {
      const books = await BookActions.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userID),
            isActual: true,
          },
        },

        {
          $group: {
            _id: "$book",
            book: { $first: "$book" },
            user: { $first: "$user" },
            last_action: { $last: "$action_date" },
            return_date: { $last: "$return_date" },
            reservation_number: { $first: "$reservation_number" },
            details: {
              $push: {
                status: "$status",
                action_date: "$action_date",
                isActual: "$isActual",
                return_date: "$return_date",
              },
            },
          },
        },
        { $sort: { return_date: 1 } },

        {
          $addFields: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$return_date",
              },
            },
            today: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: new Date(),
              },
            },
          },
        },

        {
          $addFields: {
            notToday: { $cmp: ["$date", "$today"] },
          },
        },

        {
          $match: {
            notToday: { $eq: 0 },
          },
        },

        {
          $lookup: {
            from: "books",
            let: { bookObjId: { $toObjectId: "$book" } },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$bookObjId"] } } }],
            as: "book",
          },
        },

        { $unwind: "$book" },

        {
          $lookup: {
            from: "authors",
            localField: "book.author",
            foreignField: "_id",
            as: "book.author",
          },
        },

        { $unwind: "$book.author" },

        {
          $lookup: {
            from: "genres",
            localField: "book.genre",
            foreignField: "_id",
            as: "book.genre",
          },
        },

        { $unwind: "$book.genre" },

        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },

        { $unwind: "$user" },
      ]);

      res.json(books);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllNotReturnedBooks(req, res) {
    try {
      const reservedBooks = await BookActions.aggregate([
        {
          $match: {
            isActual: true,
          },
        },
        {
          $addFields: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$return_date",
              },
            },
            today: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: new Date(),
              },
            },
          },
        },

        {
          $addFields: {
            notToday: { $cmp: ["$date", "$today"] },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },

        { $unwind: "$user" },

        {
          $lookup: {
            from: "users",
            localField: "userAction",
            foreignField: "_id",
            as: "userAction",
          },
        },

        { $unwind: "$userAction" },

        {
          $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "book",
          },
        },

        { $unwind: "$book" },

        { $sort: { action_date: -1 } },

        {
          $set: {
            data: "$$ROOT",
          },
        },

        {
          $group: {
            _id: { user: "$user", book: "$book" },
            last_action: { $first: "$action_date" },
            items: { $push: "$$ROOT" },
          },
        },

        { $sort: { last_action: -1 } },

        {
          $addFields: {
            data: { $arrayElemAt: ["$items", 0] },
            children: { $slice: ["$items", -1] },
          },
        },

        {
          $set: {
            "data.key": "$data._id",
            key: "$data._id",
          },
        },

        {
          $project: {
            _id: 0,
            data: 1,
            key: 1,
            "children.key": "$data._id",
            "children.data": 1,
          },
        },

        {
          $match: {
            $and: [
              {
                "data.return_date": {
                  $lt: new Date(),
                },
              },

              { "data.notToday": { $ne: 0 } },
            ],
          },
        },
      ]);

      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllReturnTodayBooks(req, res) {
    try {
      const reservedBooks = await BookActions.aggregate([
        {
          $match: {
            isActual: true,
          },
        },
        {
          $addFields: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$return_date",
              },
            },
            today: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: new Date(),
              },
            },
          },
        },

        {
          $addFields: {
            notToday: { $cmp: ["$date", "$today"] },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },

        { $unwind: "$user" },

        {
          $lookup: {
            from: "users",
            localField: "userAction",
            foreignField: "_id",
            as: "userAction",
          },
        },

        { $unwind: "$userAction" },

        {
          $lookup: {
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "book",
          },
        },

        { $unwind: "$book" },

        { $sort: { action_date: -1 } },

        {
          $set: {
            data: "$$ROOT",
          },
        },

        {
          $group: {
            _id: { user: "$user", book: "$book" },
            last_action: { $first: "$action_date" },
            items: { $push: "$$ROOT" },
          },
        },

        { $sort: { last_action: -1 } },

        {
          $addFields: {
            data: { $arrayElemAt: ["$items", 0] },
            children: { $slice: ["$items", -1] },
          },
        },

        {
          $set: {
            "data.key": "$data._id",
            key: "$data._id",
          },
        },

        {
          $project: {
            _id: 0,
            data: 1,
            key: 1,
            "children.key": "$data._id",
            "children.data": 1,
          },
        },
        {
          $match: {
            "data.notToday": { $eq: 0 },
          },
        },
      ]);

      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new bookController();
