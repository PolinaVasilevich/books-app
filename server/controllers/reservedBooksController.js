const mongoose = require("mongoose");

const Book = require("../models/Book");
const BookInstance = require("../models/bookinstance");
const BookActions = require("../models/BookActions");

class reservedBooksController {
  async getUserReservedBooks(req, res) {
    const { id } = req.params;
    try {
      const reservedBooks = await BookActions.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(id),
            isActual: true,
          },
        },

        { $sort: { action_date: 1 } },

        {
          $lookup: {
            from: "libraries",
            localField: "library",
            foreignField: "_id",
            as: "library",
          },
        },

        { $unwind: "$library" },

        {
          $group: {
            _id: "$book",
            book: { $first: "$book" },
            user: { $first: "$user" },
            last_action: { $last: "$action_date" },
            reservation_number: { $first: "$reservation_number" },
            library: { $first: "$library" },
            details: {
              $push: {
                status: "$status",
                action_date: "$action_date",
                isActual: "$isActual",
                return_date: "$return_date",
                library: "$library",
              },
            },
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

        { $sort: { last_action: -1 } },
      ]);

      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }

  async getReservedBooks(req, res) {
    try {
      const reservedBooks = await BookActions.aggregate([
        {
          $match: {
            isActual: true,
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
            from: "books",
            localField: "book",
            foreignField: "_id",
            as: "book",
          },
        },

        { $unwind: "$book" },

        { $sort: { action_date: -1 } },
        {
          $group: {
            _id: { user: "$user", book: "$book" },
            last_action: { $first: "$action_date" },
            data: {
              $push: {
                status: "$status",
                action_date: "$action_date",
                userAction: "$userAction",
                library: "$library",
                reservation_number: "$reservation_number",
                return_date: "$return_date",
              },
            },
          },
        },
        { $sort: { last_action: -1 } },
      ]);

      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }

  async getModifiedReservedBooks(req, res) {
    try {
      const reservedBooks = await BookActions.aggregate([
        {
          $match: {
            isActual: true,
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
            size_items: { $size: "$items" },
          },
        },

        {
          $set: {
            "data.key": "$data._id",
            key: "$data._id",
            "children.key": "$data._id",
          },
        },

        {
          $project: {
            _id: 0,
            data: 1,
            key: 1,
            size_items: 1,

            children: {
              $cond: {
                if: { $gt: ["$size_items", 1] },
                then: "$children",
                else: [],
              },
            },
          },
        },
      ]);

      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }

  async getNewReservedBooks(req, res) {
    try {
      const reservedBooks = await BookActions.aggregate([
        {
          $match: {
            isActual: true,
          },
        },
        { $sort: { action_date: -1 } },

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
            size_items: { $size: "$items" },
          },
        },

        { $match: { $expr: { $eq: ["$size_items", 1] } } },
        // { $group: { _id: null, count: { $sum: 1 } } },
      ]);

      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }

  async updateReservedBook(req, res) {
    const { id } = req.params;
    try {
      const { book, return_date } = req.body;

      await BookInstance.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            return_date,
            status: "Available",
          },
        },
        { new: true, useFindAndModify: false }
      );

      await Book.findByIdAndUpdate(
        { _id: book._id },
        {
          $set: {
            count: book.count + 1,
          },
        },
        { new: true, useFindAndModify: false }
      );

      res.json({
        message: "Reserved book was updated successfully",
      });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: `Cannot update reserved book with id: ${id}` });
    }
  }

  async deleteReservedBook(req, res) {
    const { id } = req.params;
    try {
      const { book } = req.body;
      const reservedBook = await BookInstance.findByIdAndDelete({ _id: id });

      await Book.findOneAndUpdate(
        { _id: book._id },
        {
          $set: {
            count: book.count + 1,
          },
        },

        { new: true, useFindAndModify: false }
      );

      return res.json({
        message: `${reservedBook.book.title} - Reserved book were deleted successfully!`,
      });
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: `Cannot delete reserved book with id ${id}` });
    }
  }

  // async getNewReservedBooks(req, res) {
  //   try {
  //     const reservedBooks = await BookActions.find({
  //       isActual: true,
  //       status: "Reserved",
  //     });

  //     res.json(reservedBooks);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}

module.exports = new reservedBooksController();
