const { Schema, model } = require("mongoose");

const LibrarySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: "Book" },
      count: { type: Number },
    },
  ],
});

module.exports = model("Library", LibrarySchema);
