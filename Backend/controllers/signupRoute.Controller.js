// Require User Model

const UserModel = require("../models/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const { SendEmail } = require("../middlewares/SendMail");

// UserId Generator

const generateNewUserId = (userFName) => {
  let DateN = String(Date.now());
  const userIdG = userFName + DateN.substring(0, 5);
  return userIdG;
};

//  CREATE USER

const createNewUser = async (req, res, next) => {
  const userDetails = req.body;
  const userEmail = req.body.Email;
  const userPass = req.body.Password;
  console.log(userDetails);

  // JOI VALIDATION

  const registerUserSchema = Joi.object({
    FirstName: Joi.string().min(3).required(),
    LastName: Joi.string().min(3).required(),
    Email: Joi.string().email().lowercase().required(),
    Password: Joi.string().min(7).required().strict(),
    //  ConfirmPassword: Joi.string()
    //   .valid(Joi.ref("Password"))
    //  .required()
    //  .strict(),
    Phone: Joi.number().min(10).required().strict(),
  });

  //options
  const Options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  //Validate reqbody

  const { error, value } = registerUserSchema.validate(req.body, Options);

  if (error) {
    res
      .status(501)
      .send(
        `Error :: ${error.details.map((error) => error.message).join(",")}`
      );
  } else {
    console.log("No Error !!");

    // USUAL VALIDATION

    const checkUser = await UserModel.find({ Email: userDetails.Email });

    console.log(checkUser.length);

    //if User Already There Then
    if (checkUser.length) {
      res.status(503).send("User Already Exists !! \n Try Login ");
    }
    // If User Does Not Exists then Proceed
    else {
      try {
        console.log("Creating New User !!");

        // HASING PASSWORD
        bcrypt.hash(userDetails.Password, 12, async function (err, hash) {
          if (err) {
            console.log("Internal Server Error !! \n Please Try Again !!");
            console.log(err);
            res
              .status(500)
              .send("Internal Server Error !! \n Please Try Again !!");
          } else {
            userDetails.Password = hash;
            userDetails.ConfirmPassword = hash;
            userDetails.UserLoginId = generateNewUserId(userDetails.FirstName);
            console.log(userDetails);
            const newUser = await UserModel.create(userDetails);
            newUser.save();
            console.log("Added New User To DB !!");

            /// NOW SEND EMAIL TO USER

            SendEmail(userEmail, userPass)
              .then((result) => {
                console.log(result);
                res
                  .status(200)
                  .send("Your Account is Created Successfull Go To Login!!");
              })
              .catch((err) => {
                console.log(err);
                res
                  .status(500)
                  .send(
                    "Internal Server Error \n Something Went Wrong Creating New User !!  Try Again !! "
                  );
              })
              .finally(() => {
                console.log("Finally Email Section Executed!");
              });
          }
        });
      } catch (error) {
        console.log("Something Went Wrong Creating New User !!");
        res
          .status(500)
          .send(
            "Internal Server Error \n Something Went Wrong Creating New User !!  Try Again !! "
          );
      }
    }
  }
};

module.exports = { createNewUser };
