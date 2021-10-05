const Author = require("../models/Author");
const Book = require("../models/Book");

class authorController {
  async createAuthor(req, res) {
    try {
      const { first_name, last_name } = req.body;
      const authorBook = await Author.findOne({
        first_name,
        last_name,
      });

      if (authorBook) {
        return res
          .status(400)
          .json({ message: "This author has already been created" });
      }

      const author = new Author({ first_name, last_name });
      await author.save();
      return res.json({
        message: `Author ${first_name} ${last_name} was created successfully`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create author error" });
    }
  }

  async getAuthors(req, res) {
    try {
      const authors = await Author.find();
      res.json(authors);
    } catch (e) {
      console.log(e);
    }
  }

  async updateAuthor(req, res) {
    const { id } = req.params;
    try {
      await Author.findOneAndUpdate({ _id: id }, req.body, { new: true });
      res.json({
        message: "Author was updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot update author with id: ${id}` });
    }
  }

  async deleteAuthor(req, res) {
    const { id } = req.params;
    try {
      const book = await Book.findOne({
        author: id,
      });

      if (!book) {
        const author = await Author.findByIdAndDelete({ _id: id });
        return res.json({
          message: `${author.first_name} ${author.last_name} was deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Author can't be deleted. This entry is linked with ${book.title}!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete author with id ${id}` });
    }
  }

  async deleteManyAuthors(req, res) {
    try {
      const { ids } = req.body;
      const book = await Book.findOne({
        author: { $in: ids },
      });

      if (!book) {
        await Author.deleteMany({
          _id: { $in: ids },
        });
        return res.json({
          message: `Authors with ids [${ids}] were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Author can't be deleted. This entry is linked with ${book.title}!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete authors` });
    }
  }
}
module.exports = new authorController();
