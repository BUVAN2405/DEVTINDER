const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,

      required: true,
      maxLength: 50,
      min: 3,
    },

    lastName: {
      type: String,
      min: 1,
      max: 50,
    },

    age: {
      type: Number,
      // required: true,
      min: 18,
    },

    email: {
      type: String,
      required: true,
      maxLength: 55,
      min: 10,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email is ion valid");
        }
      },
    },
    password: {
      type: "String",
      required: true,
    },

    gender: {
      type: String,
      //required: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    about: {
      type: String,
      default: "Looking for new friends",
    },
    photoUrl: {
      type: String,
      default:
       "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },

    skills: {
      type: [String],
      //required: true,
      validate(value) {
        if (value.length > 10) {
          throw new Error("skills cannot more then 10");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.index = { firstName: 1, lastName: 1 };

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "devtinder");

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const PasswordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    PasswordHash
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
