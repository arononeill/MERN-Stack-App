const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User's Favourited Contact Model Schema
const ContactSchema = new Schema({
  // variable to store current user's ID
  user_id: {
    type: String,
    required: true,
  },
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
