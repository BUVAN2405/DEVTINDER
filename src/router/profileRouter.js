const express = require("express");
const { validateToUpdate } = require("../utils/validation");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");
const { validateToUpdatePassword } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Invalid credentials");
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateToUpdate(req)) {
      throw new Error("unable to edit");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    console.log(loggedInUser);

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("error " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    // Validate the request body
    if (!validateToUpdatePassword(req)) {
      throw new Error("Invalid input for password change");
    }

    const loggedInUser = req.user;
    const { currentPassword, newPassword } = req.body;

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(
      currentPassword,
      loggedInUser.password
    );
    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    loggedInUser.password = hashedNewPassword;

    // Save the updated user object
    await loggedInUser.save();

    res.json({
      message: "Password changed successfully",
    });
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

module.exports = profileRouter;
