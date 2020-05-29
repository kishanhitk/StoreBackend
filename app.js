const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((e) => console.log(`ERROR ${e}`));

const port = 4000;

app.listen(port, console.log(`App is running on ${port}`));
app.get("/", function (req, res) {
  res.send("Welcome");
});
