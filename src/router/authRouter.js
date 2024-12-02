const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");
const { validationSignUpData } = require("../utils/validation");
const jwt = require("jsonwebtoken");

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("invalid credentail");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);     









      res.send("Logged successfully");
    } else {
      throw new Error("invalid credentail");
    }
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    // validation
    validationSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    //encryption the password
    const passwordHash = await bcrypt.hash(password, 10);

    console.log(passwordHash);

    // creating new instance of the User model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("data sent successfully");
  } catch (err) {
    res.status(400).send("error saving the user");
  }
});


authRouter.post("/logout", async (req,res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now())
  }).send("logout seuccessfully");

});

module.exports = authRouter;
