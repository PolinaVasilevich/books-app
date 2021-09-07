const { Schema, model } = require("mongoose");

const BookActionsSchema = new Schema({
  book: { type: Schema.ObjectId, ref: "Book", required: true },
  user: { type: Schema.ObjectId, ref: "User", require: true },
  userAction: { type: Schema.ObjectId, ref: "User", require: true },
  status: {
    type: String,
    required: true,
    default: "",
    enum: ["Reserved", "Received", "Returned", "Canceled"],
  },
  action_date: {
    type: Date,
    required: true,
  },
  isActual: { type: Boolean, default: true },
  reservation_number: { type: String },
  return_date: { type: Date },
});

module.exports = model("BookActions", BookActionsSchema);
