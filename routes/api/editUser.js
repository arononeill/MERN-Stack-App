// Various programs needed to exexecute asynchornous data consumption from REST API
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

//@route    POST api/editUser
//@desc     Edit user
//@access   Public
// AJAX POST to edit current user
router.post("/", (req, res) => {
  const { id, name, email } = req.body;

  // Simple validation
  if (!name || !email) {
    console.log("enter all fields");
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user & if found, save new details
  User.findById(id).then((user) => {
    if (user) {
      console.log("user was found");
      user.name = name;
      user.email = email;
      console.log(user);

      user.save();
    } else {
      console.log("no user");
      return res.status(400).json({ msg: "User does not exist" });
    }
  });
});

//@route    DELETE api/editUser
//@desc     Delete A User
//@access   Private
// AJAX DELETE to remove current user, with auth being used to verify if user is logged in
router.delete("/:id", auth, (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
