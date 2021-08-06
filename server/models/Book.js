const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  img: { type: String },
  author: { type: Schema.ObjectId, ref: "Author", required: true },
  count: {
    type: Number,
    required: true,
  },
  genre: { type: Schema.ObjectId, ref: "Genre" },
  rating: { type: Number, default: 0 },
});

BookSchema.virtual("url").get(function () {
  return "/books/book/" + this._id;
});

module.exports = model("Book", BookSchema);
