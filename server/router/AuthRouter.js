const jwt = require("jsonwebtoken");
const express = require("express");
const authRouter = express.Router();
// const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
// const User = require("../model/userSchema");
const Register = require("../controllers/Auth/Register");
const Login = require("../controllers/Auth/Login");

// require("../db/conn");
// const TomatoData = require("../model/TomatoData");


// authRouter.get("/", (req, res) => {
//   res.send("Hello from server authRouter js");
// });

authRouter.post("/register", Register);
authRouter.post("/login", Login);

//Farmer Tomato Data
authRouter.post("/submit-tomato-data", async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      todaydate,
      weight,
      selectedOption,
      price,
      currentTime,
    } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !todaydate ||
      !weight ||
      !selectedOption ||
      !price
    ) {
      return res
        .status(422)
        .json({ error: "Please fill in all the fields properly." });
    }
    // Create a new instance of the TomatoData model
    const dateOnly = todaydate.split("T")[0];

    const tomatoData = new TomatoData({
      name,
      phoneNumber,
      todaydate: dateOnly,
      weight,
      selectedOption,
      price,
      currentTime,
    });

    // Save the data to the MongoDB collection
    await tomatoData.save();

    res.status(200).json({ message: "Tomato data submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Getting the farmer submitted data
authRouter.get("/get-tomato-data", async (req, res) => {
  try {
    const { selectedOption } = req.query;

    if (!selectedOption) {
      return res.status(400).json({ error: "Selected option is required." });
    }

    // Query your MongoDB collection for data based on the selected option
    const tomatoData = await TomatoData.find({ selectedOption });
    // console.log(tomatoData);

    res.status(200).json(tomatoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.delete("/delete-tomato/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the data with the given ID exists
    const existingData = await TomatoData.findById(id);

    if (!existingData) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Delete the data from the database
    await TomatoData.deleteOne({ _id: id });

    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Login Route
// authRouter.post("/signin", );

module.exports = authRouter;
