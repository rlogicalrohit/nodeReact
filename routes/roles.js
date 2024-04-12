const express = require("express");
const rolesPermissionController = require("../controller/rolesPermissionController");
const route = express.Router();

route.post("/create", rolesPermissionController.createRoles);

module.exports = route;