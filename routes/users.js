const config             = require('config');
const jwt                = require('jsonwebtoken');
const express            = require('express');
const Joi                = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const bcrypt             = require('bcryptjs');
const _                  = require('lodash');
const db                 = require('../models/index');

const router = express.Router();  //api/users

const complexityOptions = {
  min: 5,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 2,
};

function validateUser(user) {
  const schema = {
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required(),
    password: new PasswordComplexity(complexityOptions).required()
  };

  return Joi.validate(user, schema);
}

// User Registration
router.post('/', async (req, res) => { 
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userFound =   await db.User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (userFound) return res.status(400).send('User already registered');
  
  // Create new user
  let user = await db.User.build({
    username: req.body.username,
    email:    req.body.email,
    password: req.body.password
  });
  // Hash password
  const salt    = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  user = await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['username', 'email']));

});


module.exports = router;