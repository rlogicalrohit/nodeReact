const express = require("express");
const route = express.Router();
const webhook = require("../controller/webhookController.js");

route.post("/", webhook.webhookHandler);

module.exports = route;