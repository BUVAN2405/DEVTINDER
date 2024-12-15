const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/authRouter");
const requestRouter = require("./router/requestRouter");
const profileRouter = require("./router/profileRouter");
const userRouter = require("./router/user");

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error(" database cannot be connected");
  });
