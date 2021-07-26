const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
// const BookInstance = require("./models/bookinstance");

class bookController {
  async createAuthor(req, res) {
    try {
      const { first_name, last_name } = req.body;
      const authorBook = await Author.find({
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
      return res.json({ message: "Author has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create author error" });
    }
  }

  async createGenre(req, res) {
    try {
      const { name } = req.body;
      const genreBook = await Author.findOne({
        name,
      });
      if (genreBook) {
        return res
          .status(400)
          .json({ message: "This genre has already been created" });
      }

      const genre = new Genre({ name });
      await genre.save();
      return res.json({ message: "Genre has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create genre error" });
    }
  }

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

      const authorBook = await Author.findOne({
        first_name: author.split(" ")[0],
        last_name: author.split(" ")[1],
      });

      const genreBook = await Genre.findOne({ name: genre });

      const book = new Book({
        title,
        img,
        count,
        author: authorBook._id,
        genre: [genreBook._id],
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
      const books = await Book.find().populate("author").populate("genre");
      res.json(books);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new bookController();
