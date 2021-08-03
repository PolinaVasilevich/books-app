const User = require("../models/User/User");
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
      const user = await User.findByIdAndDelete({ _id: id });
      return res.json({
        message: `${user.username} - were deleted successfully!`,
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Cannot delete user with id ${id}` });
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
