const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Buvan:qIcSXG5NJLmf2oGq@node.zg10q.mongodb.net/"
  );
};

module.exports = connectDB;
