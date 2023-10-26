const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path: './config.env'})


require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
//Router Files
app.use(require('./router/auth'));
const PORT = process.env.PORT;



// app.get('/about', (req, res) => {
//     console.log("Hello My About");
//   res.send("Hello from about server");
// });

app.get('/contact', (req, res) => {
  res.send("Hello from contact server");
});

app.get('/signin', (req, res) => {
  res.send("Hello from signin server");
});

app.get('/signup', (req, res) => {
  res.send("Hello from signup server");
});

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});

