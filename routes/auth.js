const config  = require('config');
const jwt     = require('jsonwebtoken');
const express = require('express');
const Joi     = require('joi');
const bcrypt  = require('bcryptjs');
const _       = require('lodash');

const router = express.Router();  //api/users


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
    id: 3,
    name: "shaun2",
    email: "shaun2@gmail.com",
    // Unhashed: "testing12345@!"
    password: "$2a$10$5ctHrY2CeGu9EcK9ijIOKuNlPF7v42TrH1xbK99LoqdneYRiepKNS"
  }
  
]


function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

// User Login
router.post('/', async (req, res) => { 
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Replace below line with `await` database search for users
  const user =   users.find( user => { return user.email == req.body.email});
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = jwt.sign({ id: user.id }, config.get('jwtPrivateKey'));

  res.send(token);

});


module.exports = router;