const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tradespeople Model Schema
const TradespersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tradesperson = mongoose.model(
  "tradesperson",
  TradespersonSchema
);
