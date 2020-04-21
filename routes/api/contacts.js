// Various programs needed to exexecute asynchornous data consumption from REST API
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Contact Model
const Contact = require("../../models/Contact");

//@route    GET api/contacts
//@desc     GET All Contacts
//@access   Public
// AJAX GET to retrieve all favourited contacts
router.get("/", (req, res) => {
  Contact.find()
    .sort({ date: -1 })
    .then((contacts) => res.json(contacts));
});

//@route    POST api/contacts
//@desc     Create All Contacts
//@access   Private
/* AJAX POST to create new favourite contact, with the current user's ID being assigned
   & auth being used to verify if user is logged in */
router.post("/", auth, (req, res) => {
  const newContact = new Contact({
    user_id: req.body.user_id,
    name: req.body.name,
    occupation: req.body.occupation,
    phone: req.body.phone,
  });

  newContact.save().then((contact) => res.json(contact));
});

//@route    DELETE api/contacts
//@desc     Delete A Contact
//@access   Private
// AJAX DELETE to remove favourite contact, with auth being used to verify if user is logged in
router.delete("/:id", auth, (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => contact.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
