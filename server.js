const express = require('express');
const env     = require('dotenv').config();
const path    = require('path');
const users   = require('./routes/users')
const auth    = require('./routes/auth');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

