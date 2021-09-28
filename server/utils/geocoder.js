const NodeGeoCoder = require("node-geocoder");
const { GEOCODER_API_KEY } = require("../config");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeoCoder(options);

module.exports = geocoder;
