const express = require("express");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", async (req, res) => {
  res.send("connecting request send");
});

module.exports = requestRouter;
