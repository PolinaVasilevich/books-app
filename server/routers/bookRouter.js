const Router = require("express");
const router = new Router();
const bookController = require("../controllers/bookController");

router.post("/book", bookController.createBook);
router.post("/author", bookController.createAuthor);
router.post("/genre", bookController.createGenre);

router.post("/review", bookController.createReview);

router.post("/reservebook", bookController.reserveBook);
router.post("/giveoutbook", bookController.giveOutBook);
router.post("/returnbook", bookController.returnBook);
router.post("/cancelbook", bookController.cancelBook);

router.get("/allbooks", bookController.getBooks);
router.get("/allauthors", bookController.getAuthors);
router.get("/allgenres", bookController.getGenres);
router.get("/allreservedbooks", bookController.getReservedBooks);
router.get("/reservedbooks/:id", bookController.getUserReservedBooks);
router.get("/allreviews", bookController.getReviews);
router.get("/allbookactions", bookController.getAllBookActions);

router.get("/reviewsbook/:id", bookController.getReviewsBook);

router.get("/mostpopularbooks", bookController.getMostPopularBooks);
router.put("/updatebook/:id", bookController.updateBook);
router.put("/updateauthor/:id", bookController.updateAuthor);
router.put("/updategenre/:id", bookController.updateGenre);
router.put("/updatereview/:id", bookController.updateReview);
router.put("/updatereservedbook/:id", bookController.updateReservedBook);

router.delete("/deletebook/:id", bookController.deleteBook);
router.delete("/deletemanybooks", bookController.deleteManyBooks);
router.delete("/deleteauthor/:id", bookController.deleteAuthor);
router.delete("/deletemanyauthors", bookController.deleteManyAuthors);
router.delete("/deletegenre/:id", bookController.deleteGenre);
router.delete("/deletemanygenres", bookController.deleteManyGenres);
router.delete("/deletereservedbook/:id", bookController.deleteReservedBook);
router.delete("/deletereview/:id", bookController.deleteReview);

module.exports = router;
