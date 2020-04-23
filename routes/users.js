const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
//@route    POST api/users
//@desc     Register a user
//@access   Public
router.post(
  "/",
  [
    check("name", "Please Enter your Name").not().isEmpty(),
    check("email", "Please Enter a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with minimum 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //Check if the user already exist
      let user = await User.findOne({ email: email });

      if (user) {
        //if user exists then return error
        return res.status(400).json({ msg: "User already exists" });
      }

      //Create a new User
      user = new User({
        name,
        email,
        password,
      });

      //generate a hash password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //save the user to the User Model
      await user.save();

      //If the user has been saved then
      //send the payload
      const payload = {
        user: {
          id: user.id,
        },
      };

      //To generate a token we have to sign it
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;

          res.json({ token });
        }
      );
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error :(");
    }
  }
);

module.exports = router;
