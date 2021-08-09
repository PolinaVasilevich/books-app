const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
const BookInstance = require("../models/bookinstance");
const Review = require("../models/Review");

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

      const book = new Book({
        title,
        img,
        count,
        author: author._id,
        genre: [genre._id],
      });

      await book.save();
      return res.json({ message: "Book has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create book error" });
    }
  }

  async createReview(req, res) {
    try {
      const { book, user, text, rating } = req.body;

      const review = new Review({
        text,
        book: book._id,
        user: user._id,
      });

      await review.save();
      return res.json({ message: "Review has created" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create review error" });
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

  async getReviews(req, res) {
    try {
      const Reviews = await Review.find()
        .populate("user")
        .populate({ path: "book", populate: ["author", "genre"] });
      res.json(Reviews);
    } catch (error) {
      console.log(error);
    }
  }

  ///END GET///

  ///BGN UPDATE///
  async updateBook(req, res) {
    const { id } = req.params;
    try {
      const { author, genre } = req.body;

      await Book.findOneAndUpdate(
        { _id: id },
        { ...req.body, author: author._id, genre: [genre._id] },
        { new: true, useFindAndModify: false }
      );
      res.json({
        message: "Book was updated successfully",
      });
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

  async updateReservedBook(req, res) {
    const { id } = req.params;
    try {
      const { user, book } = req.body;

      const reservedBook = await BookInstance.findOne({
        user: user._id,
        book: book._id,
      });

      if (reservedBook) {
        return res
          .status(400)
          .send({ message: "You have already reserved this book" });
      }

      await BookInstance.findOneAndUpdate(
        { _id: id },
        { ...req.body, user: user._id, book: [book._id] },
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
      const { user, book, date_reserved } = req.body;

      if (book) {
        const reservedBook = await BookInstance.findOne({
          user: user._id,
          book: book._id,
        });

        if (reservedBook) {
          return res
            .status(400)
            .send({ message: "You can't book it. The book is out of stock. " });
        }

        if (!book.count) {
          return res
            .status(400)
            .send({ message: "You have already reserved this book" });
        }

        const bookInstance = new BookInstance({
          book: book._id,
          user: user._id,
          status: "Reserved",
          date_reserved,
        });

        await Book.findOneAndUpdate(
          { _id: book._id },
          { ...book, count: book.count - 1 },
          { new: true, useFindAndModify: false }
        );

        await bookInstance.save();

        return res.json({
          message: `${bookInstance.book.title} has reserved successfully!`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot reserved book` });
    }
  }

  async deleteReservedBook(req, res) {
    const { id } = req.params;
    try {
      const { book } = req.body;
      const reservedBook = await BookInstance.findByIdAndDelete({ _id: id });

      await Book.findOneAndUpdate(
        { _id: book._id },
        { ...book, count: book.count + 1 },
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
}

module.exports = new bookController();
