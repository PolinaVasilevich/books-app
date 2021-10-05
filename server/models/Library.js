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
  const [postalcode, city, street, number] = this.address.split(",");

  const loc = await geoCoder.geocode({
    city,
    postalcode,
    street: number + " " + street,
  });

  console.log(loc);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
  };

  next();
});

module.exports = model("Library", LibrarySchema);
