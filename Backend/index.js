const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//Routes
const indexRouteHandler = require("./routes/indexRouteHandler");

// Middle Wares
app.use(cors());
app.use(bodyParser.json());

// DataBase Connection

mongoose
  .connect("mongodb://127.0.0.1:27017/LoginSignup")
  .then(() => console.log("Connected To DB!"))
  .catch((err) => {
    console.log(err);
    console.log("Error Connecting To DB !!");
  });

const greetUser = (req, res, next) => {
  res.status(200).send("Welcome To Your Application !!!");
};

app.get("/", greetUser);

//Handle Route

app.use(indexRouteHandler);

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server Started !!");
});
