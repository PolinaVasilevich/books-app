const Router = require("express");
const { check } = require("express-validator");
const controller = require("../controllers/authController");

const router = new Router();

router.post(
  "/registration",
  [check("username", "Имя пользователя не может быть пустым").notEmpty()],
  controller.registration
);

router.post("/login", controller.login);
router.get("/users", controller.getUsers);

module.exports = router;
