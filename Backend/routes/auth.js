const express = require("express");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const fecthuser = require('../middleware/fetchUser');

// Creating a user
const JWT_SECRET = "qwertyuiop";

router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      // check for the user existence;
      let found_user = await User.findOne({ email: req.body.email });
      // console.log(found_user);
      if (found_user != null) {
        res.status(400).json({
          error: "Sorry user with this email already exists",
        });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const secure = await bcrypt.hash(req.body.email, salt);

      let user = await User.create({
        name: req.body.name,
        password: secure,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user._id,
        },
      };

      const token = jwt.sign(data, JWT_SECRET);
      res.json({ message: "user created successfully", token: token });
    } catch (err) {
      console.log(err);
      res.json({ err: err.message, message: "something went wrong" });
    }
  }
);

// Authenticate the user

router.post(
  "/login",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      let user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ error: "please enter valid credentials" });
      }

      const passowrdCheck = await bcrypt.compare(password, user.password);

      if (passowrdCheck) {
        return res
          .status(400)
          .json({ error: "please enter valid credentials" });
      }

      const data = {
        user: {
          id: user._id,
        },
      };

      const token = jwt.sign(data, JWT_SECRET);
      res.json({ message: "Login successful", token: token });
    } catch (err) {
      console.log(err);
      res.json({ err: err.message, message: "something went wrong" });
    }
  }
);

// get the logged in user details

router.post("/getuser", fecthuser,(req, res) => {
  try {
    const {user} = req.user;
    console.log(user);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.json({ err: err.message, message: "something went wrong" });
  }
});

module.exports = router;
