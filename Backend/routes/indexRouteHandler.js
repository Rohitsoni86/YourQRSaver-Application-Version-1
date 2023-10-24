const express = require("express");

const loginRoute = require("./loginRoute");
const signupRoute = require("./signupRoute");
const userRoute = require("./User/userRoutes");

const indexRouteHandler = express.Router();

indexRouteHandler.use(signupRoute); // For Login Handle
indexRouteHandler.use(loginRoute); // For Signup Handle
indexRouteHandler.use(userRoute); // For Signup Handle

module.exports = indexRouteHandler;
