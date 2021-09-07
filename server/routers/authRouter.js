const Router = require("express");
const { check } = require("express-validator");
const controller = require("../controllers/authController");

const router = new Router();

router.post("/login", controller.login);

router.get("/users", controller.getUsers);
router.post(
  "/user",
  [check("username", "Имя пользователя не может быть пустым").notEmpty()],
  controller.registration
);

router.put("/updateuser/:id", controller.updateUser);
router.delete("/deleteuser/:id", controller.deleteUser);
router.delete("/deletemanyusers", controller.deleteManyUsers);
module.exports = router;
