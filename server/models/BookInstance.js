const { Schema, model } = require("mongoose");

const BookInstanceSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true },
  user: { type: Schema.ObjectId, ref: "User", require: true },
  status: {
    type: String,
    required: true,

    enum: ["Available", "Reserved", "OnHand", "Canceled"],
  },
  date_reserved: { type: Date, default: Date.now },
  return_date: { type: Date },
  last_action_date: { type: Date },
});

BookInstanceSchema.virtual("url").get(function () {
  return "/books/bookinstance/" + this._id;
});

module.exports = model("BookInstance", BookInstanceSchema);
