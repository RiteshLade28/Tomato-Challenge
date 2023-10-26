const jwt = require("jsonwebtoken");
const express = require("express");
const tomatoDataRouter = express.Router();
// const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
// const User = require("../model/userSchema");
const PostData = require("../controllers/TomatoData/PostData");
const GetData = require("../controllers/TomatoData/GetData");
const DeleteData = require("../controllers/TomatoData/DeleteData");

// require("../db/conn");
// const TomatoData = require("../model/TomatoData");

//Farmer Tomato Data
tomatoDataRouter.post("/submit-tomato-data", PostData);

//Getting the farmer submitted data
tomatoDataRouter.get("/get-tomato-data", GetData);

tomatoDataRouter.delete("/delete-tomato/:id", DeleteData);

module.exports = tomatoDataRouter;
