const Router = require("express");
const router = new Router();
const bookController = require("../controllers/bookController");

router.post("/author", bookController.createAuthor);
router.post("/genre", bookController.createGenre);
router.post("/book", bookController.createBook);

router.get("/allbooks", bookController.getBooks);
module.exports = router;
