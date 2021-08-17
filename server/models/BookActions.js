const { Schema, model } = require("mongoose");

const BookActionsSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true },
  user: { type: Schema.ObjectId, ref: "User", require: true },
  action: {
    type: String,
    required: true,
    default: "",
    enum: ["Reserved", "Received", "Returned", "Canceled"],
  },
  action_date: {
    type: Date,
    required: true,
  },
});

module.exports = model("BookActions", BookActionsSchema);
