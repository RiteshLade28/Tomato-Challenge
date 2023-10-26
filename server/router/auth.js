const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const User = require("../model/userSchema");

require("../db/conn");
const TomatoData = require("../model/TomatoData");

router.get("/", (req, res) => {
  res.send("Hello from server router js");
});

router.post("/register", async (req, res) => {
  const { name, phone, password, cpassword } = req.body;
  if (!name || !phone || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill in the data properly." });
  }

  try {
    const userExist = await User.findOne({ phone: phone });
    console.log(userExist);

    if (userExist) {
      return res.status(422).json({ error: "User Already Exist" });
    } else if (password !== cpassword) {
      return res.status(422).json({ error: "Password does not match." });
    } else {
      const user = new User({ name, phone, password, cpassword });
      await user.save();
      res.status(201).json({ message: "User Registered Successfully.." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Farmer Tomato Data
router.post("/submit-tomato-data", async (req, res) => {
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
router.get("/get-tomato-data", async (req, res) => {
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

router.delete("/delete-tomato/:id", async (req, res) => {
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
router.post("/signin", async (req, res) => {
  try {
    let token;
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res
        .status(400)
        .json({ error: "Please fill in the data properly." });
    }

    const userLogin = await User.findOne({ phone: phone });

    // console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const payload = {
        user: {
          id: userLogin._id,
          name: userLogin.name, // Add the name to the payload
          phone: userLogin.phone, // Add the phone to the payload
        },
      };

      // Sign the token
      jwt.sign(
        payload,
        process.env.SECRET_KEY, // Use your secret key here
        { expiresIn: 3600 }, // Adjust the expiration time as needed
        (err, token) => {
          if (err) throw err;

          // Set the token in the cookie
          res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true,
          });

          res.json({ token, message: "User Signed In Successfully." });
        }
      );
    } else {
      res.status(400).json({ error: "Invalid Credentials. " });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
