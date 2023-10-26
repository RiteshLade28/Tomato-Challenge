const mongoose = require('mongoose');

// Define the schema for tomato data
const tomatoDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  todaydate: {
    type: Date,
    get: (date) => {
      console.log('get function called');
      // Format the date as YYYY-MM-DD without trailing zeros
      return date.toISOString().split('T')[0];
    },
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // currentTime: {
  //   type: String,
  //   required: true,
  // },
});

// Create a model for the tomato data
const TomatoData = mongoose.model('TomatoData', tomatoDataSchema);

module.exports = TomatoData;
