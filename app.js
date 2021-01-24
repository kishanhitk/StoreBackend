import { connect } from "mongoose";
import express, { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
require("dotenv").config();

//Routes
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import categoryRoute from "./routes/category";
import productRoute from "./routes/product";
import orderRoute from "./routes/order";

//Making connection to DB
connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB CONNECTED"))
  .catch((e) => console.log(`ERROR ${e}`));

//Middlewares
app.use(json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);

//Port
const port = 4000;

//Starting the server
app.listen(port, console.log(`App is running on ${port}`));
app.get("/", function (req, res) {
  res.send("Welcome");
});
