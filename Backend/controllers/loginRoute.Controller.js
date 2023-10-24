const UserModel = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { generateToken } = require("../middlewares/generateToken");

const verifyUser = async (req, res, next) => {
  const userDetails = req.body;
  console.log(userDetails);
  console.log("Login User Req !");
  // JOI VALIDATION

  const userSchemaVa = Joi.object({
    Email: Joi.string().email().lowercase().required(),
    Password: Joi.string().min(7).required().strict(),
  });

  //options
  const Options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  //Validate reqbody

  const { error, value } = userSchemaVa.validate(req.body, Options);

  if (error) {
    res
      .status(501)
      .send(` ${error.details.map((error) => error.message).join(",")}`);
  } else {
    console.log("No Validation Error !!");

    // USUAL VALIDATION

    const User = await UserModel.find({ Email: userDetails.Email });
    console.log(User);
    console.log(User[0]);
    console.log(User.length);
    //if User Exists There Then

    if (User.length) {
      try {
        console.log("User Login Request !!");
        console.log(User);

        // Decrypting PASSWORD
        bcrypt.compare(
          userDetails.Password,
          User[0].Password,
          async function (err, result) {
            if (err) {
              console.log("Password Do Not Match !! \n Please Try Again !!");
              console.log(err);
              res
                .status(500)
                .send("Password Do Not Match !! \n Please Try Again !!");
            } else {
              console.log(result);
              if (result) {
                // if user found then send success message !!
                const tokenG = generateToken(User[0]); //generate Token With Ad  Details
                console.log("Generated Token Success !! \n");
                console.log(tokenG);
                res.status(200).send({ Token: `${tokenG}` }); // Flag:86 for Admin && Flag:96 for Reporter User
                console.log("Login Success & Token Sent !!");
              } else {
                console.log("Password Do Not Match !! \n Please Try Again !!");
                res
                  .status(404)
                  .send("Password Do Not Match !! \n Please Try Again !!");
              }
            }
          }
        );
      } catch (error) {
        console.log("Something Went Wrong Login User !!");
        res
          .status(500)
          .send(
            "Internal Server Error \n Something Went Wrong Login User !!  Try Again !! "
          );
      }
    }
    // If User Does Not Exists then Proceed
    else {
      res.status(503).send("User Does Not Exists !! \n Try Signup ");
    }
  }
};

module.exports = { verifyUser };
