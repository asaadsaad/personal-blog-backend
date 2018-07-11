//Require packages
const mongoose = require('mongoose');
const Entry = require('../models/entry');
const dateFormat = require('dateformat');

//GET request for all
module.exports.post = async (req, res) => {
    //Access date property
    let date = req.body.date

    //Convert date to string
    date = date.toString();

    //Format date
    date = dateFormat(date, 'dddd, mmmm, dS, yyyy');

    //Convert date back to array
    date = date.split(", ");

    //Declare new entry
    const entry = new Entry({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        date: {
            initial: req.body.date,
            year: req.body.date[0],
            month: {
                default: req.body.date[1],
                formated: [date[1]]
            },
            day: {
                default: req.body.date[2],
                formated: [date[0], date[2]]
            }
        },
        time: {
            initial: req.body.time,
            set: req.body.time
        },
        tags: req.body.tags,
        type: req.body.type,
        data: { preview: req.body.data.preview, body: req.body.data.body }
    });
    //Save new entry to DB
    entry
        .save()
        .then((result) => {
            //Send status code 200 and json data
            res.status(200).json({
                message: 'Handling POST requests to /products/',
                data: entry
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};