// Various programs needed to exexecute asynchornous data consumption from REST API
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

//@route    POST api/users
//@desc     Register new user
//@access   Public
// AJAX POST to create new user
router.post("/", (req, res) => {
  const { name, email, password, password2 } = req.body;

  // Simple validation
  if (!name || !email || !password || !password2) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password !== password2) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists users" });

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create hashed password, assign them a token and save the user
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
