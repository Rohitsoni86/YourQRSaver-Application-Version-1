const QRcodeModel = require("../models/qrCodesModel");
const UserModel = require("../models/userModel");
const mongoose = require("mongoose");
const { getUserIdFromToken } = require("../middlewares/getUserIdFromToken");

const GetUserDetails = async (req, res, next) => {
  const loggedId = await getUserIdFromToken(req.headers.token);

  try {
    const User = await UserModel.findById(loggedId, { _id: 0, Password: 0 });
    console.log("Found User", User);
    res.status(200).send(User);
  } catch (error) {
    throw error;
    res
      .status(500)
      .send("Internal Server Error \n Something Went Wrong !!  Try Again !! ");
  }
};

const SaveQrCode = async (req, res, next) => {
  const QRDetails = req.body;
  const loggedId = await getUserIdFromToken(req.headers.token);

  console.log("Parsed", QRDetails);

  console.log(loggedId);

  let QrCodeObject = {
    CreatedBy: new mongoose.Types.ObjectId(loggedId),
    DataImageURL: QRDetails.DataImageURL,
  };

  console.log("Objected Created ::", QrCodeObject);

  try {
    const newQRCode = await QRcodeModel.create(QrCodeObject);
    newQRCode.save();
    console.log("Saved New QR Code Successfully !!");
    res.status(200).send("Saved New QR Code Successfully !!");
  } catch (err) {
    throw err;
    res
      .status(500)
      .send(
        "Internal Server Error \n Something Went Wrong Saving QR Code !!  Try Again !! "
      );
  }
};

const GetAllQRCodesByUser = async (req, res, next) => {
  const loggedId = await getUserIdFromToken(req.headers.token);
  console.log(loggedId);

  try {
    const QRCodeList = await QRcodeModel.find(
      {
        CreatedBy: loggedId,
      },
      { CreatedBy: 0 }
    );

    // Now Return Array Of Objects
    res.status(200).send({ List: QRCodeList });
    console.log(QRCodeList);
  } catch (err) {
    console.log(err);
    throw err;
    res
      .status(500)
      .send(
        "Internal Server Error \n Something Went Wrong Fetcing QR Code !!  Try Again !! "
      );
  }
};

const deleteSavedQRCode = async (req, res, next) => {
  const QRid = req.params["id"];
  console.log(QRid);

  console.log("Deleting QR Code !!");

  try {
    const QRCode = await QRcodeModel.findByIdAndDelete(QRid);
    console.log(`Deleted QR :${QRCode}`);
    res.status(200).send("QR Code Deleted Successfully !!");
  } catch (error) {
    throw error;
    res
      .status(500)
      .send(
        "Internal Server Error \n Something Went Wrong Deleting QR Code !!  Try Again !! "
      );
  }
};

module.exports = {
  GetUserDetails,
  SaveQrCode,
  GetAllQRCodesByUser,
  deleteSavedQRCode,
};
