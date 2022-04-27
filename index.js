const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoHandler");
const userHandler = require("./routeHandler/userHandler");
const app = express();

app.use(express.json());
dotenv.config();
// database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_custer);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB not Connected");
  }
};
connectDB();

app.use("/todo", todoHandler);
app.use("/user", userHandler);

// default error handler
const defaultErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(defaultErrorHandler);

// server listen
app.listen(5000, () => {
  console.log("app is running");
});
