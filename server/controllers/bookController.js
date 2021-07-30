const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
const User = require("../models/User/User");
const BookInstance = require("../models/bookinstance");

class bookController {
  ///BGN CREATE///
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
      return res.json({ message: "Author has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create author error" });
    }
  }

  async createGenre(req, res) {
    try {
      const { name } = req.body;
      const genreBook = await Genre.findOne({
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

      const genreBook = await Genre.findOne({
        name: genre,
      });

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

  ///END CREATE///

  ///BGN GET///
  async getBooks(req, res) {
    try {
      const books = await Book.find().populate("author").populate("genre");
      res.json(books);
    } catch (e) {
      console.log(e);
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

  async getGenres(req, res) {
    try {
      const genres = await Genre.find();
      res.json(genres);
    } catch (e) {
      console.log(e);
    }
  }

  async getReservedBooks(req, res) {
    try {
      const reservedBooks = await BookInstance.find()
        .populate("user")
        .populate({ path: "book", populate: ["author", "genre"] });
      res.json(reservedBooks);
    } catch (e) {
      console.log(e);
    }
  }

  ///END GET///

  ///BGN UPDATE///
  async updateBook(req, res) {
    const { id } = req.params;
    try {
      const { author, genre } = req.body;

      const authorBook = await Author.findOne({
        first_name: author.split(" ")[0],
        last_name: author.split(" ")[1],
      });

      const genreBook = await Genre.findOne({
        name: genre,
      });

      await Book.findOneAndUpdate(
        { _id: id },
        { ...req.body, author: authorBook._id, genre: [genreBook._id] },
        { new: true, useFindAndModify: false }
      );
      res.json({
        message: "Book was updated successfully",
      });

      // await Book.findOneAndUpdate({ _id: id }, req.body, { new: true })
      //   .populate("author")
      //   .populate("genre");

      // res.json({
      //   message: "Book was updated successfully",
      // });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot update book with id: ${id}` });
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

  async updateGenre(req, res) {
    const { id } = req.params;
    try {
      await Genre.findOneAndUpdate({ _id: id }, req.body, { new: true });
      res.json({
        message: "Genre was updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot update genre with id: ${id}` });
    }
  }

  ///END UPDATE///

  ///BGN DELETE///
  async deleteBook(req, res) {
    const { id } = req.params;
    try {
      const book = await Book.findByIdAndDelete({ _id: id });
      return res.json({
        message: `${book.title}- Author were deleted successfully!`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete book with id ${id}` });
    }
  }

  async deleteAuthor(req, res) {
    const { id } = req.params;
    try {
      const author = await Author.findByIdAndDelete({ _id: id });
      return res.json({
        message: `${author.first_name} ${author.last_name} - Author were deleted successfully!`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete author with id ${id}` });
    }
  }

  async deleteGenre(req, res) {
    const { id } = req.params;
    try {
      const genre = await Genre.findByIdAndDelete({ _id: id });
      return res.json({
        message: `${genre.name} - Genre were deleted successfully!`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete genre with id ${id}` });
    }
  }

  ///END DELETE///

  async reserveBook(req, res) {
    try {
      const { username, bookId } = req.body;

      const book = await Book.findById({ _id: bookId });
      const user = await User.findOne({ username });

      // const userReserved = await BookInstance.findOne({ user: user._id });
      // const bookReserved = await BookInstance.findOne({ book: book._id });

      const reservedBook = await BookInstance.findOne({
        user: user._id,
        book: book._id,
      });

      if (reservedBook) {
        return res
          .status(400)
          .send({ message: "You have already reserved this book" });
      }

      const bookInstance = new BookInstance({
        book: book._id,
        user: user._id,
        status: "Reserved",
      });

      await bookInstance.save();
      return res.json({
        message: `${bookInstance.book.title} has reserved successfully!`,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot reserved book` });
    }
  }
}

module.exports = new bookController();
