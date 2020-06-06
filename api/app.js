const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = require('./keys').mongodbURI;

const app = express();

// Install middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('tiny'));


// Import routes
const userRoutes = require('./routes/users');

// Setup database
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {
        console.log("connected successfully");
    })
    .catch(error => {
        console.log(error);
    });

// Install routes as middleware. The second argument is a handler
app.use('/user', userRoutes);


module.exports = app;