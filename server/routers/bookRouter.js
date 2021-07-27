const Router = require("express");
const router = new Router();
const bookController = require("../controllers/bookController");

router.post("/author", bookController.createAuthor);
router.post("/genre", bookController.createGenre);
router.post("/book", bookController.createBook);

router.get("/allbooks", bookController.getBooks);
router.get("/info", bookController.getReservedBooks);

router.post("/bookinstance", bookController.reserveBook);
router.put("/book/:id", bookController.updateBook);
module.exports = router;
