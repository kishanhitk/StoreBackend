const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

//Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const categoryRoute = require("./routes/category");

//Making connection to DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((e) => console.log(`ERROR ${e}`));

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoute);

//Port
const port = 4000;

//Starting the server
app.listen(port, console.log(`App is running on ${port}`));
app.get("/", function (req, res) {
  res.send("Welcome");
});
