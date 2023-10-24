const express = require("express");

const userRoute = express.Router();

const {
  GetUserDetails,
  SaveQrCode,
  GetAllQRCodesByUser,
  deleteSavedQRCode,
} = require("../../controllers/userRoute.Controller");

userRoute.get("/getuserdetails", GetUserDetails); // For getting USer Data
userRoute.post("/saveqrcode", SaveQrCode); // For Saving QR Code
userRoute.get("/getmyqrcodes", GetAllQRCodesByUser); // For Getting all linked QR
userRoute.delete("/deleteqrcode/:id", deleteSavedQRCode); // For Getting all linked QR

module.exports = userRoute;
