const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payments");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const order = razorpayInstance.orders.create({
      amount: req.body.amount,
      currency: "INR",
      receipt: req.body.receipt,
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });

    const payment = new payment({
      userId: req.user._id,
      orderId: order.id,
      status: "created",
      amount: req.body.amount,
      currency: "INR",
      receipt: req.body.receipt,
      notes: {
        key1: "value3",
        key2: "value2",
      },
      paymentMethod: req.body.paymentMethod,
    });

    const savedPayment = await payment.save();
    res.json({ ...savedPayment._doc, orderId: order.id });
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
});

module.exports = paymentRouter;
