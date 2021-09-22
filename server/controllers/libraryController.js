const Library = require("../models/Library");
const Book = require("../models/Book");

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
      const library = await Library.find().populate("books.book");
      res.json(library);
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
      const book = await Book.findOne({
        author: id,
      });

      if (!book) {
        const library = await Library.findByIdAndDelete({ _id: id });
        return res.json({
          message: `${library.name} were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Library can't be deleted. This entry is linked with ${book.title}!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete library with id ${id}` });
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

      const data = req.body;

      const bookToLibrary = await Library.find({
        _id: id,
        "books.book": data.book._id,
      });

      if (bookToLibrary?.length) {
        await Library.updateOne(
          { _id: id, "books.book": data.book._id },
          { $set: { "books.$.count": data.count } }
        );

        res.json({
          message: "Book was updated successfully",
        });
      } else {
        await Library.findOneAndUpdate(
          { _id: id },
          { $push: { books: data } },
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
