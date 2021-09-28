const { Schema, model } = require("mongoose");
const geoCoder = require("../utils/geocoder");

const LibrarySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  books: [
    {
      book: { type: Schema.Types.ObjectId, ref: "Book" },
      count: { type: Number },
    },
  ],

  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
  },
});

LibrarySchema.pre("save", async function (next) {
  const loc = await geoCoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
  };

  this.address = undefined;
  next();
});

module.exports = model("Library", LibrarySchema);
