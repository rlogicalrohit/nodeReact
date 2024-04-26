const express = require("express");
const route = express.Router();
const payment = require("../controller/paymentController.js");

route.post("/", payment.createPayment);

module.exports = route;