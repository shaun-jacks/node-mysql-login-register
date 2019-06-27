const config = require("config");
const jwt = require("jsonwebtoken");
const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const db = require("../models/index");

const router = express.Router(); //api/users

function validate(req) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  return Joi.validate(req, schema);
}

// User Login
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Replace below line with `await` database search for users
  const user = await db.User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send(token);
});

module.exports = router;
