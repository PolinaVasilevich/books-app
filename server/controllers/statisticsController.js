const mongoose = require("mongoose");

const BookActions = require("../models/BookActions");

class statisticsController {
  async getMostPopularBooks(req, res) {
    try {
      const mostPopularBooks = await BookActions.aggregate([
        { $match: { status: "Returned" } },

        {
          $group: {
            _id: "$book",
            book: { $first: "$book" },
            count: { $sum: 1 },
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
          $match: {
            count: { $gte: 2 },
          },
        },
        {
          $project: {
            _id: 0,
            count: 0,
          },
        },
      ]);

      res.json(mostPopularBooks);
    } catch (error) {
      console.log(error);
    }
  }

  async getTopBooks(req, res) {
    try {
      const topBooks = await BookActions.aggregate([
        { $match: { status: "Returned" } },

        {
          $group: {
            _id: "$book",
            book: { $first: "$book" },
            action_date: { $first: "$action_date" },
            count: { $sum: 1 },
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
          $match: {
            count: { $gte: 3 },
          },
        },

        { $sort: { count: -1, "book.title": 1 } },

        { $limit: 5 },

        {
          $group: {
            _id: null,
            books: { $push: "$$ROOT" },
          },
        },

        {
          $addFields: {
            titles: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.book.title",
              },
            },
            data: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.count",
              },
            },
            action_date: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.action_date",
              },
            },
          },
        },

        {
          $project: {
            _id: 0,
            books: 0,
          },
        },
      ]);
      res.json(topBooks[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getTopBooksOfCurrentMonth(req, res) {
    try {
      const topBooks = await BookActions.aggregate([
        {
          $match: {
            status: "Returned",
            $expr: {
              $eq: [{ $month: "$action_date" }, { $month: new Date() }],
            },
          },
        },

        {
          $group: {
            _id: "$book",
            book: { $first: "$book" },

            count: { $sum: 1 },
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
          $match: {
            count: { $gte: 1 },
          },
        },

        { $sort: { count: -1, "book.title": 1 } },

        { $limit: 5 },

        {
          $group: {
            _id: null,
            books: { $push: "$$ROOT" },
          },
        },

        {
          $addFields: {
            titles: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.book.title",
              },
            },
            data: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.count",
              },
            },
          },
        },

        {
          $project: {
            _id: 0,
            books: 0,
          },
        },
      ]);
      res.json(topBooks[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getTopBooksUser(req, res) {
    const { id } = req.params;
    try {
      const topBooks = await BookActions.aggregate([
        {
          $match: { status: "Returned", user: new mongoose.Types.ObjectId(id) },
        },

        {
          $group: {
            _id: "$book",
            book: { $first: "$book" },
            action_date: { $first: "$action_date" },
            count: { $sum: 1 },
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

        { $sort: { count: -1, "book.title": 1 } },

        // { $limit: 5 },

        {
          $group: {
            _id: null,
            books: { $push: "$$ROOT" },
          },
        },

        {
          $addFields: {
            titles: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.book.title",
              },
            },
            data: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.count",
              },
            },
          },
        },

        {
          $project: {
            _id: 0,
            books: 0,
          },
        },
      ]);
      res.json(topBooks[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async getStatisticsUserByMonth(req, res) {
    const { id } = req.params;
    try {
      const topBooks = await BookActions.aggregate([
        {
          $match: { status: "Returned", user: new mongoose.Types.ObjectId(id) },
        },

        {
          $addFields: {
            month: { $month: "$action_date" },
          },
        },

        {
          $group: {
            _id: "$month",
            book: { $first: "$book" },
            month: { $first: "$month" },
            count: { $sum: 1 },
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

        { $sort: { month: 1 } },

        // // { $limit: 5 },

        {
          $group: {
            _id: null,
            books: { $push: "$$ROOT" },
          },
        },

        {
          $addFields: {
            months: [
              "",
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
        },

        {
          $addFields: {
            titles: {
              $map: {
                input: "$books",
                as: "item",
                in: { $arrayElemAt: ["$months", "$$item.month"] },
              },
            },
            data: {
              $map: {
                input: "$books",
                as: "item",
                in: "$$item.count",
              },
            },
          },
        },

        {
          $project: {
            _id: 0,
            books: 0,
            months: 0,
          },
        },
      ]);
      res.json(topBooks[0]);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new statisticsController();
