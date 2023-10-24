const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    lowercase: true,
    min: 3,
  },
  MiddleName: {
    type: String,
    lowercase: true,
    min: 3,
  },
  LastName: {
    type: String,
    required: true,
    lowercase: true,
    min: 3,
  },
  ProfilePhoto: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  UserLoginId: {
    type: String,
    required: true,
    min: 3,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: true,
    min: 7,
    max: 14,
  },
  Role: {
    type: String,
    default: "customer",
  },
  Nationality: {
    type: String,
    required: true,
    lowercase: true,
    default: "Indian",
  },
  Phone: {
    type: Number,
    min: 10,
  },
  RegisterDate: {
    type: Date,
    default: Date.now(),
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
