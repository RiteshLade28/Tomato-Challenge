const mongoose = require("mongoose");
const DB = process.env.MONGODB_URI;
console.log(DB);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((err) => {
    console.error(`Connection error: ${err.message}`);
  });