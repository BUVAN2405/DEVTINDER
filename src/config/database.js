const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Buvan:vb180205@node.zg10q.mongodb.net/"
  );
};

module.exports = connectDB;
