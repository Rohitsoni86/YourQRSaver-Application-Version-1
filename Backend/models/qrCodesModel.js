const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const qrCodeSchema = mongoose.Schema({
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  DataImageURL: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const QRcodeModel = mongoose.model("QRModel", qrCodeSchema);

module.exports = QRcodeModel;
