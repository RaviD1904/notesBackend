const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModal = require("../models/User.modal");

const userController = express.Router();

userController.post("/signup", (req, res) => {
  // console.log(req.body)
  const { email, password } = req?.body;
  try {
    if (!email || !password) {
      res.status(401).send("Email And Password required");
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        res.send("Please Try Again");
      }

      const new_user = new UserModal({
        email,
        password: hash,
      });
      await new_user.save();
      res.status(201).send("User Signup Successfully");
    });
  } catch (error) {
    res.send("Something Went Wrong, Please try again");
  }
});

userController.post("/signin", async (req, res) => {
  const { email, password } = req?.body;

  try {
    if (!email || !password) {
      return res.status(401).send("Email And Password required");
    }
    let user = await UserModal.findOne({ email });
    // console.log(user)
    const hash = user?.password;
    bcrypt.compare(password, hash, async function (err, result) {
      if (result) {
        const token = await jwt.sign(
          {
            email,
            userID:user?._id
          },
          "secret"
        );
        res.status(201).send({ message: "User Login Successfully", token });
      }
      if (err) {
        res.status(401).send("Invalid Email/Password");
      }
    });
  } catch (error) {
    res.send("Something Went Wrong, Please try again");
  }
});

module.exports = userController;
