const Library = require("../models/Library");
const Book = require("../models/Book");

class libraryController {
  async createLibrary(req, res) {
    try {
      const { name, address } = req.body;
      const libraries = await Library.findOne({
        name,
      });

      if (libraries) {
        return res
          .status(400)
          .json({ message: "This library has already been created" });
      }

      const library = new Library({ name, address });
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
      const library = await Library.find();
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

  // async deleteAuthor(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const book = await Book.findOne({
  //       author: id,
  //     });

  //     if (!book) {
  //       const author = await Author.findByIdAndDelete({ _id: id });
  //       return res.json({
  //         message: `${author.first_name} ${author.last_name} were deleted successfully!`,
  //       });
  //     } else {
  //       return res.status(400).json({
  //         message: `Author can't be deleted. This entry is linked with ${book.title}!`,
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     res.status(400).json({ message: `Cannot delete author with id ${id}` });
  //   }
  // }

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
