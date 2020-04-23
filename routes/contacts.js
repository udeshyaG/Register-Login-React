const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

//@route    GET api/contacts
//@desc     Get all users contacts
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/contacts
//@desc     add a new contact
//@access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Email is required").isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      //create a new contact
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });

      //Save the new Contact to database
      const contact = await newContact.save();
      //return the new contact to the user
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).status("Server Error");
    }
  }
);

//@route    PUT api/contacts/:id
//@desc     Update a contact
//@access   Private
router.put("/:id", auth, async (req, res) => {
  //pull out these items from the body
  const { name, email, phone, type } = req.body;

  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    //console.log(contact);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    //if allowed then update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    DELETE api/contacts/:id
//@desc     Delete a contact
//@access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Make sure it is the correct user's contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
