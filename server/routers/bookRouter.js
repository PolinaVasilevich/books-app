const Router = require("express");
const router = new Router();
const bookController = require("../controllers/bookController");

router.post("/book", bookController.createBook);
router.post("/author", bookController.createAuthor);
router.post("/genre", bookController.createGenre);
router.post("/reservebook", bookController.reserveBook);
router.post("/review", bookController.createReview);

router.get("/allbooks", bookController.getBooks);
router.get("/allauthors", bookController.getAuthors);
router.get("/allgenres", bookController.getGenres);
router.get("/allreservedbooks", bookController.getReservedBooks);
router.get("/allreviews", bookController.getReviews);

router.put("/updatebook/:id", bookController.updateBook);
router.put("/updateauthor/:id", bookController.updateAuthor);
router.put("/updategenre/:id", bookController.updateGenre);
router.put("/updatereview/:id", bookController.updateReservedBook);

router.delete("/deletebook/:id", bookController.deleteBook);
router.delete("/deleteauthor/:id", bookController.deleteAuthor);
router.delete("/deletegenre/:id", bookController.deleteGenre);
router.delete("/deletereservedbook/:id", bookController.deleteReservedBook);
router.delete("/deletereview/:id", bookController.deleteReservedBook);

module.exports = router;
