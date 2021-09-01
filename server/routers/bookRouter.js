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
////END BOOK ACTIONS////

////BGN RESERVED BOOKS////
router.get("/allreservedbooks", reservedBooksController.getReservedBooks);
router.get(
  "/modifiedreservedbooks",
  reservedBooksController.getModifiedReservedBooks
);
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
router.get("/topbooksuser/:id", statisticsController.getTopBooksUser);
router.get(
  "/topbookscurrentmonth",
  statisticsController.getTopBooksOfCurrentMonth
);
router.get(
  "/statisticsuserbymonth/:id",
  statisticsController.getStatisticsUserByMonth
);
////END STATISTICS////

module.exports = router;
