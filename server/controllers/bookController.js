const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
const User = require("../models/User/User");
const BookInstance = require("../models/bookinstance");

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

  async getReservedBooks(req, res) {
    try {
      const reservedBooks = await BookInstance.find();

      console.log(reservedBooks);
      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }

  async reserveBook(req, res) {
    try {
      const { username, bookId } = req.body;

      const book = await Book.findById({ _id: bookId });
      const user = await User.findOne({ username });

      const userReserved = await BookInstance.findOne({ user: user._id });
      const bookReserved = await BookInstance.findOne({ book: book._id });

      console.log(userReserved);
      console.log(bookReserved);

      if (userReserved && bookReserved) {
        return res.status(400).json({ message: "You reserved this book " });
      }

      const bookInstance = new BookInstance({
        book: book._id,
        user: user._id,
        status: "Reserved",
      });

      await bookInstance.save();
      return res.json({ message: "BookInstance has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create bookInstance error" });
    }
  }

  async updateBook(req, res) {
    try {
      Book.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true },
        (err, book) => {
          if (err) res.send(err);
          res.json(book);
        }
      );
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Update book error" });
    }
  }
}

module.exports = new bookController();
