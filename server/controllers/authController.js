const User = require("../models/User/User");
const Review = require("../models/Review");
const BookActions = require("../models/BookActions");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { username, password, isAdmin } = req.body;

      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with the same name already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);

      const user = new User({
        username,
        password: hashPassword,
        isAdmin,
        created_date: Date.now(),
      });
      await user.save();
      return res.json({ message: "User registered successfully" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User ${username} is not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: `Wrong password entered` });
      }

      const token = generateAccessToken(user._id);

      await User.findOneAndUpdate(
        { username },
        {
          $set: {
            last_logon: Date.now(),
          },
        },
        { new: true, useFindAndModify: false }
      );

      return res.json({ token, user });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const bookAction = await BookActions.findOne({ user: id });
      const review = await Review.findOne({ user: id });

      if (!bookAction && !review) {
        const user = await User.findByIdAndDelete({ _id: id });
        return res.json({
          message: `${user.username} were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `User can't be deleted. This entry is linked to other schemes!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete user with id ${id}` });
    }
  }

  async deleteManyUsers(req, res) {
    try {
      const { ids } = req.body;

      const bookAction = await BookActions.findOne({ user: { $in: ids } });
      const review = await Review.findOne({ user: { $in: ids } });

      if (!bookAction && !review) {
        await User.deleteMany({
          _id: { $in: ids },
        });
        return res.json({
          message: `Users with ids [${ids}] were deleted successfully!`,
        });
      } else {
        return res.status(400).json({
          message: `Users can't be deleted. This entry is linked to other schemes!`,
        });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete users` });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    try {
      let { password } = req.body;

      const user = await User.findById({ _id: id });

      if (!(user.password === password)) {
        password = bcrypt.hashSync(password, 7);
      }

      await User.findOneAndUpdate(
        { _id: id },
        { ...req.body, password },
        { new: true }
      );
      res.json({
        message: "User was updated successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: `Cannot update user with id: ${id}` });
    }
  }
}

module.exports = new authController();
