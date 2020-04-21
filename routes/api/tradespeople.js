const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Tradesperson Model
const Tradesperson = require("../../models/Tradesperson");

//@route    GET api/tradespeople
//@desc     GET All Tradespeople
//@access   Public
// AJAX GET to retrieve all tradespeople
router.get("/", (req, res) => {
  Tradesperson.find()
    .sort({ date: -1 })
    .then((tradespeople) => res.json(tradespeople));
});

//@route    POST api/tradespeople
//@desc     Create All Tradespeople
//@access   Private
// AJAX POST to create new tradesperson
router.post("/", (req, res) => {
  const newTradesperson = new Tradesperson({
    name: req.body.name,
    occupation: req.body.occupation,
    phone: req.body.phone,
    location: req.body.location,
  });

  newTradesperson.save().then((tradesperson) => res.json(tradesperson));
});

module.exports = router;
