const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("data sent successfully");
  } catch (err) {
    res.status(400).send("error saving the user");
  }
});

//
app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const user = await User.findOne({ email: userEmail });
    res.send(user);

    //     const user = await User.find({email : email});
    //     if(users.length ===0 ) {
    //     res.status(404)send

    //   } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("error fetching the user");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("someithing went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userdel = req.body.userId;
  try {
    const users = await User.deleteOne({ userdel });
    res.send(users);
    d;
  } catch (err) {
    res.status(400).send("unable to delete");
  }
});

// app.patch("/user", async (req, res) => {
//   const userId = req.body.userId;
//   const data = req.body;

//   // Optional: Validate userId and data here

//   try {
//     const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "before ",
//     });
//     console.log(updatedUser); // Log the updated user
//     res.send("user updated successfully");
//   } catch (err) {
//     res.status(400).send("unable to update");
//   }
// });

app.patch("/user", async (req, res) => {
  const userId = req.body.email;
  const data = req.body;

  // Optional: Validate userId and data here

  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before ",
    });
    console.log(updatedUser); // Log the updated user
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("unable to update");
    ss;
  }
});

connectDB()
  .then(() => {
    console.log("database connected successfully");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
