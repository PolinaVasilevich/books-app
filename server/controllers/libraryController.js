const Library = require("../models/Library");
const Book = require("../models/Book");
const BookActions = require("../models/BookActions");
const mongoose = require("mongoose");

class libraryController {
  async createLibrary(req, res) {
    try {
      const { name, address, books } = req.body;
      const libraries = await Library.findOne({
        name,
      });

      if (libraries) {
        return res
          .status(400)
          .json({ message: "This library has already been created" });
      }

      const library = new Library({ name, address, books });
      await library.save();
      return res.json({
        message: `Library ${name} has created`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create library error" });
    }
  }

  async getLibraries(req, res) {
    try {
      const libraries = await Library.aggregate([
        {
          $addFields: {
            books: {
              $filter: {
                input: "$books",
                as: "item",
                cond: {
                  $gt: ["$$item.count", 0],
                },
              },
            },
          },
        },
        {
          $addFields: {
            "books.library": "$_id",
            isExpandable: {
              $cond: [{ $eq: [{ $size: "$books" }, 0] }, false, true],
            },
          },
        },
        {
          $unwind: {
            path: "$books",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "books.book",
            foreignField: "_id",
            as: "books.book",
          },
        },

        {
          $unwind: {
            path: "$books.book",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            address: { $first: "$address" },
            isExpandable: { $first: "$isExpandable" },
            location: { $first: "$location" },
            books: {
              $push: "$books",
            },
          },
        },

        { $sort: { name: 1 } },
      ]);

      res.json(libraries);
    } catch (e) {
      console.log(e);
    }
  }
  async getLibrariesByBook(req, res) {
    const { id } = req.params;
    try {
      const libraries = await Library.aggregate([
        { $unwind: "$books" },
        {
          $match: {
            "books.book": new mongoose.Types.ObjectId(id),
            "books.count": { $gt: 0 },
          },
        },

        {
          $addFields: {
            "options.position": {
              lng: { $arrayElemAt: ["$location.coordinates", 0] },
              lat: { $arrayElemAt: ["$location.coordinates", 1] },
            },
            "options.title": "$name",
          },
        },

        {
          $project: {
            _id: 1,
            name: 1,
            address: 1,
            options: 1,
            book_count: "$books.count",
          },
        },
      ]);

      res.json(libraries);
    } catch (e) {
      console.log(e);
    }
  }

  // async updateAuthor(req, res) {
  //   const { id } = req.params;
  //   try {
  //     await Author.findOneAndUpdate({ _id: id }, req.body, { new: true });
  //     res.json({
  //       message: "Author was updated successfully",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(400).json({ message: `Cannot update author with id: ${id}` });
  //   }
  // }

  async deleteLibrary(req, res) {
    const { id } = req.params;
    try {
      const books = await Library.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $project: {
            _id: 0,
            size_books: {
              $size: "$books",
            },
          },
        },
      ]);

      if (!books[0].size_books) {
        const library = await Library.findByIdAndDelete({ _id: id });
        return res.json({
          message: `${library.name} were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Library can't be deleted. This entry is linked with other entries!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete library with id ${id}` });
    }
  }

  async deleteBookLibrary(req, res) {
    const { libraryid, bookid } = req.params;
    try {
      const library = await Library.findOne({
        _id: libraryid,
      });

      if (!library) {
        return res.status(400).json({
          message: `Library with id ${libraryid} does not exist!`,
        });
      }

      const book = await BookActions.findOne({
        "book._id": bookid,
        isActual: true,
      });

      if (!book) {
        await Library.updateOne(
          { _id: libraryid },
          { $pull: { books: { book: bookid } } }
        );

        return res.json({
          message: `The book with id ${bookid} were deleted to library successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `The book with id ${bookid} can't be deleted. This entry is linked with ${book.title}!`,
        });
      }
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: `Cannot delete book from library with id ${id}` });
    }
  }

  async addBooksToLibrary(req, res) {
    const { id } = req.params;

    try {
      const library = await Library.findOne({
        _id: id,
      });

      if (!library) {
        return res.status(400).json({
          message: `Library with id ${id} does not exist!`,
        });
      }

      const { book, count } = req.body;

      const bookToLibrary = await Library.find({
        _id: id,
        "books.book": book._id,
      });

      if (bookToLibrary?.length) {
        await Library.updateOne(
          { _id: id, "books.book": book._id },
          { $set: { "books.$.count": count } }
        );

        res.json({
          message: "Book was updated successfully",
        });
      } else {
        await Library.updateOne(
          { _id: id },
          { $push: { books: { book, count } } },
          { new: true }
        );
        res.json({
          message: "Book was added successfully",
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot add books to library` });
    }
  }

  // async deleteManyAuthors(req, res) {
  //   try {
  //     const { ids } = req.body;
  //     const book = await Book.findOne({
  //       author: { $in: ids },
  //     });

  //     if (!book) {
  //       await Author.deleteMany({
  //         _id: { $in: ids },
  //       });
  //       return res.json({
  //         message: `Authors with ids [${ids}] were deleted successfully!`,
  //       });
  //     } else {
  //       return res.status(400).json({
  //         message: `Author can't be deleted. This entry is linked with ${book.title}!`,
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     res.status(400).json({ message: `Cannot delete authors` });
  //   }
  // }
}
module.exports = new libraryController();
