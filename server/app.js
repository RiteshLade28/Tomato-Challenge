const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const db = require("./db/conn");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

//Router Files
app.use("/api/auth/", require("./router/AuthRouter"));
app.use("/api/tomatoData/", require("./router/TomatoData"));


app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
