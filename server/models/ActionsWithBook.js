const { Schema, model } = require("mongoose");

const ActionsWithBookSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true },
  user: { type: Schema.ObjectId, ref: "User", require: true },
  action: {
    type: String,
    required: true,
    default: "",
    enum: ["Reserved", "OnHand", "Canceled"],
  },
  action_date: {
    type: Date,
    required: true,
  },
});

module.exports = model("ActionsWithBook", ActionsWithBookSchema);
