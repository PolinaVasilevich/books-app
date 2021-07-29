const Router = require("express");
const router = new Router();
const bookController = require("../controllers/bookController");

router.post("/book", bookController.createBook);
router.post("/author", bookController.createAuthor);
router.post("/genre", bookController.createGenre);

router.post("/reservebook", bookController.reserveBook);

router.get("/allbooks", bookController.getBooks);
router.get("/allauthors", bookController.getAuthors);
router.get("/allgenres", bookController.getGenres);
router.get("/info", bookController.getReservedBooks);

router.put("/updatebook/:id", bookController.updateBook);
router.put("/updateauthor/:id", bookController.updateAuthor);
router.put("/updategenre/:id", bookController.updateGenre);

router.delete("/deletebook/:id", bookController.deleteBook);
router.delete("/deleteauthor/:id", bookController.deleteAuthor);
router.delete("/deletegenre/:id", bookController.deleteGenre);

module.exports = router;
