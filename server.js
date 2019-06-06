const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const env = require('dotenv').config();
const path = require('path');


const app = express();
