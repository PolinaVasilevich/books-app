const { Schema, model } = require("mongoose");

const User = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  //   roles: [{ type: String, ref: "Role" }],
  isAdmin: { type: Boolean, default: false },
  created_date: { type: Date },
  last_logon: { type: Date },
});

module.exports = model("User", User);
