//Require packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Require routes
const get_entry = require('./routes/get');
const post_entry = require('./routes/post');
const put_entry = require('./routes/put');
const patch_entry = require('./routes/patch');
const delete_entry = require('./routes/delete');


//Setup express
const app = express();

//Setup cors
app.use(cors());

//Connect to db
mongoose
    .connect('mongodb://admin:adminadmin0@ds125381.mlab.com:25381/admin-control', { useNewUrlParser: true })
    .then(() => console.log('Connected successfully to MLAB server'))
    .catch((err) => console.log(`Error connecting to MLAB server : ${err}`));

//Disable express identifying itself within browser
app.use(function (req, res, next) {
    //Change 'x-powered-by' to empty string
    res.header("x-powered-by", '');
    next();
});

//Setup morgan
app.use(morgan(process.env.ENVIRONMENT || 'dev'));


//Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setup routes
app.use('/get', get_entry);
app.use('/post', post_entry);
app.use('/patch', patch_entry);
app.use('/put', put_entry);
app.use('/delete', delete_entry);

//Handle errors
app.use((req, res, next) => {
    let error = new Error("Pafe Not Found");
    error.status = 404;
    error.message = "Page Not Found";
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error
        }
    });
});

//Export app
module.exports = app;