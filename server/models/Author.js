const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

AuthorSchema.virtual("name").get(() => `${this.first_name} ${this.last_name}`);

AuthorSchema.virtual("url").get(() => `/books/author/${this._id}`);

module.exports = model("Author", AuthorSchema);
