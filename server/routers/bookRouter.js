const Router = require("express");
const router = new Router();

const bookController = require("../controllers/bookController");
const authorController = require("../controllers/authorController");
const genreController = require("../controllers/genreController");
const reviewController = require("../controllers/reviewController");
const bookActionsController = require("../controllers/bookActionsController");
const reservedBooksController = require("../controllers/reservedBooksController");
const statisticsController = require("../controllers/statisticsController");

////BGN BOOK////
router.get("/allbooks", bookController.getBooks);
router.post("/book", bookController.createBook);
router.put("/updatebook/:id", bookController.updateBook);
router.delete("/deletebook/:id", bookController.deleteBook);
router.delete("/deletemanybooks", bookController.deleteManyBooks);

////END BOOK////

////BGN AUTHOR////
router.get("/allauthors", authorController.getAuthors);
router.post("/author", authorController.createAuthor);
router.put("/updateauthor/:id", authorController.updateAuthor);
router.delete("/deleteauthor/:id", authorController.deleteAuthor);
router.delete("/deletemanyauthors", authorController.deleteManyAuthors);
////END AUTHOR////

////BGN GENRE////
router.get("/allgenres", genreController.getGenres);
router.post("/genre", genreController.createGenre);
router.put("/updategenre/:id", genreController.updateGenre);
router.delete("/deletegenre/:id", genreController.deleteGenre);
router.delete("/deletemanygenres", genreController.deleteManyGenres);
////END GENRE////

////BGN REVIEW////
router.get("/allreviews", reviewController.getReviews);
router.get("/reviewsbook/:id", reviewController.getReviewsBook);
router.get("/userreviewsbook/:bookid&:userid", reviewController.getUserReviews);
router.post("/review", reviewController.createReview);
router.put("/updatereview/:id", reviewController.updateReview);
router.delete("/deletereview/:id", reviewController.deleteReview);
////END REVIEW////

////BGN BOOK ACTIONS////
router.get("/allbookactions", bookActionsController.getAllBookActions);
router.post("/reservebook", bookActionsController.reserveBook);
router.post("/giveoutbook", bookActionsController.giveOutBook);
router.post("/returnbook", bookActionsController.returnBook);
router.post("/cancelbook", bookActionsController.cancelBook);

router.get(
  "/not-returned-books/:userID",
  bookActionsController.getNotReturnedBooksUser
);

router.get(
  "/return-today-books/:userID",
  bookActionsController.getReturnTodayBooks
);

router.get(
  "/all-not-returned-books",
  bookActionsController.getAllNotReturnedBooks
);

router.get(
  "/all-return-today-books",
  bookActionsController.getAllReturnTodayBooks
);

////END BOOK ACTIONS////

////BGN RESERVED BOOKS////
router.get("/allreservedbooks", reservedBooksController.getReservedBooks);
router.get("/new-reserved-books", reservedBooksController.getNewReservedBooks);
router.get(
  "/modifiedreservedbooks",
  reservedBooksController.getModifiedReservedBooks
);

router.get("/new-reserved-books", reservedBooksController.getNewReservedBooks);
router.get("/reservedbooks/:id", reservedBooksController.getUserReservedBooks);

router.put(
  "/updatereservedbook/:id",
  reservedBooksController.updateReservedBook
);
router.delete(
  "/deletereservedbook/:id",
  reservedBooksController.deleteReservedBook
);
////END RESERVED BOOKS////

////BGN STATISTICS////
router.get("/mostpopularbooks", statisticsController.getMostPopularBooks);
router.get("/topbooks", statisticsController.getTopBooks);
router.get(
  "/topbookscurrentmonth",
  statisticsController.getTopBooksOfCurrentMonth
);

router.get("/topbooksuser/:id", statisticsController.getTopBooksUser);

router.get(
  "/statisticsuserbymonth/:id",
  statisticsController.getStatisticsUserByMonth
);

router.get("/statistics-uses", statisticsController.getNewUsersForCurrentYear);
router.get(
  "/statistics-uses-current-month",
  statisticsController.getNewUsersCurrentMonth
);
router.get(
  "/statistics-reserved-books-current-year",
  statisticsController.getStatisticsReservedBooksCurrentYear
);

router.get(
  "/statistics-reserved-books-current-month",
  statisticsController.getStatisticsReservedBooksCurrentMonth
);

////END STATISTICS////

module.exports = router;
