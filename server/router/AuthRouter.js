const jwt = require("jsonwebtoken");
const express = require("express");
const authRouter = express.Router();
// const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
// const User = require("../model/userSchema");
const Register = require("../controllers/Auth/Register");
const Login = require("../controllers/Auth/Login");
const ApmcRegister = require("../controllers/Auth/ApmcRegister");
const ApmcLogin = require("../controllers/Auth/ApmcLogin");


authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/apmcRegister", ApmcRegister);
// authRouter.post("/apmcLogin", ApmcLogin);
// authRouter.post("/adminLogin", AdminLogin);



module.exports = authRouter;
