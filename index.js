const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const route = require('./routes');

require('dotenv').config();

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Morgan for logging
app.use(morgan('dev'));

// Ejs Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGODB_URL || '')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


const port = process.env.PORT || 8080;

app.use('/api/client', route.clientAPIRoute);
app.use('/client', route.clientUIRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});