const { Schema, model } = require("mongoose");

const GenreSchema = new Schema({
  name: { type: String, required: true },
});

GenreSchema.virtual("url").get(() => `/books/genre/${this._id}`);

module.exports = model("Genre", GenreSchema);
