const mongoose = require("mongoose");

// Define the APMC schema
const apmcSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  commodities: [
    {
      type: String,
    },
  ],
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// Create a model from the schema
const APMC = mongoose.model("APMC", apmcSchema);

module.exports = APMC;
