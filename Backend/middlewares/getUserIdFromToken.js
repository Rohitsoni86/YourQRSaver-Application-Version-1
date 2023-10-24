const jwt = require("jsonwebtoken");
const globalConfig = require("../configs/globalpass.config");

const getUserIdFromToken = async (tokenfetched) => {
  console.log("Fetched Token :", tokenfetched);
  let verificationB;

  const payloadData = await jwt.verify(
    tokenfetched,
    globalConfig.SecKey,
    (err, data) => {
      if (err) {
        console.log({
          message: "Cannot Verify Your Identity",
          err: err,
        });
      } else {
        console.log(data);
        verificationB = data._id; //Extract User Id From Details
        return verificationB;
      }
    }
  );

  console.log("Printing Payload Data !!");

  console.log(payloadData);

  return verificationB;
};

module.exports = { getUserIdFromToken };
