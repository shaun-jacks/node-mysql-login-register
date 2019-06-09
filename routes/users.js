const express            = require('express');
const Joi                = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const bcrypt             = require('bcryptjs');
const _                  = require('lodash');

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

let users = [
  {
    id: 1,
    name: 'Shaun',
    email: 'shaun@gmail.com',
    password: '12345'
  },
  {
    id: 2,
    name: 'John',
    email: 'john@gmail.com',
    password: '12345'
  },
  {
    name: "shaun2",
    email: "shaun2@gmail.com",
    password: "$2a$10$5ctHrY2CeGu9EcK9ijIOKuNlPF7v42TrH1xbK99LoqdneYRiepKNS"
  }
  
]


function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required(),
    password: new PasswordComplexity(complexityOptions).required()
  };

  return Joi.validate(user, schema);
}

// User Registration
router.post('/', async (req, res) => { 
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Replace below line with database search for users
  const userExists =   users.some( user => { return user.email == req.body.email});
  if (userExists) return res.status(400).send('User already registered');
  
  // Create new user
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  // Hash password
  const salt    = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  res.send(_.pick(user, ['name', 'email', 'password']));

});


module.exports = router;