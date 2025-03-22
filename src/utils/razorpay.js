const Razorpay = require("razorpay");

var instance = new Razorpay({
  Key_id: "",
  Key_secret: "",
});
module.exports = instance;
