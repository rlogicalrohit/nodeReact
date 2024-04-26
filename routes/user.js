const express = require("express");
const create = require("../controller/userController.js");
const route = express.Router();

route.post("/register", create.createUser);
route.post("/login", create.loginUser);
route.post("/", create.loginUser);

module.exports = route;