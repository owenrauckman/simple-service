const express = require('express');
const { passportInit } = require('./lib/passport');
const mongo = require('./lib/mongo');
const apollo = require('./lib/apollo');

const app = express();
passportInit();
mongo();
apollo(app);
