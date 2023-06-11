require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const { NODE_ENV, PORT } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.listen(NODE_ENV === 'production' ? PORT : config.PORT);
