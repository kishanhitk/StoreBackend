const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((e) => console.log(`ERROR ${e}`));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
const port = 4000;
app.listen(port, console.log(`App is running on ${port}`));
app.get("/", function (req, res) {
  res.send("Welcome");
});
