const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true },
  user: { type: Schema.ObjectId, ref: "User", require: true },
  text: { type: String, required: true },
  created_date: { type: Date, default: Date.now },
  edit_date: { type: Date },
  rating: { type: Number },
});

module.exports = model("Review", ReviewSchema);
