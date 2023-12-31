const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  appointedBy: {
    type: String,
    required: true,
  },
  dateAppointed: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.pre("save", async function (next) {
  // console.log("hi from inside");
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
      this.cpassword = await bcrypt.hash(this.cpassword, 12);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

//We are generating Token
adminSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
