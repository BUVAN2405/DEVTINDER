const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("please login");
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("user not found");
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
};

module.exports = { userAuth };
