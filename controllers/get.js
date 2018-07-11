//Require packages
const mongoose = require('mongoose');
const Entry = require('../models/entry');

//GET request for all
module.exports.get_all = async (req, res) => {
    //Retrieve all documents in DB
    Entry.find({})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

//GET single by id
module.exports.get_by_id = async (req, res) => {
    //Retrieve only documents matching the specified ID
    Entry.findById(req.params.id)
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/:id',
                data: [result]
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

//GET all by title
module.exports.get_by_title = async (req, res) => {
    //Retrieve only documents matching the specified TITLE    
    Entry.find({ title: req.params.title })
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

//GET all by author
module.exports.get_by_author = async (req, res) => {
    //Retrieve only documents matching the specified AUTHOR
    Entry.find({ author: req.params.author })
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

//GET all by year
module.exports.get_by_date_year = async (req, res) => {
    // Retrieve only documents matching the specified YEAR
    Entry.find({ 'date.year': req.params.year })
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
}

//GET all by month
module.exports.get_by_date_month = async (req, res) => {
    const month = req.params.month;
    //Check if month is a number
    if (isNaN(month)) {
        // Retrieve only documents matching the specified MONTH
        Entry.find({ 'date.month.formated': req.params.month })
            .then((result) => {
                res.status(200).json({
                    message: 'Handling GET requests to /get/',
                    data: result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error
                });
            });
    } else {
        // Retrieve only documents matching the specified MONTH
        Entry.find({ 'date.month.default': req.params.month })
            .then((result) => {
                res.status(200).json({
                    message: 'Handling GET requests to /get/',
                    data: result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error
                });
            });
    }
}

//GET all by day
module.exports.get_by_date_day = async (req, res) => {
    const day = req.params.day;
    //Check if day is a number
    if (isNaN(day)) {
        // Retrieve only documents matching the specified DAY
        Entry.find({ 'date.day.formated[0]': req.params.daty })
            .then((result) => {
                res.status(200).json({
                    message: 'Handling GET requests to /get/',
                    data: result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error
                });
            });
    } else {
        // Retrieve only documents matching the specified DAY
        Entry.find({ 'date.day.default': req.params.day })
            .then((result) => {
                res.status(200).json({
                    message: 'Handling GET requests to /get/',
                    data: result
                });
            })
            .catch((error) => {
                res.status(500).json({
                    error: error
                });
            });
    }
}

//GET all by TYPE
module.exports.get_by_type = async (req, res) => {
    //Retrieve only documents matching the specified TYPE    
    Entry.find({ type: req.params.type })
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
}

//GET all by tag
module.exports.get_by_tag = async (req, res) => {
    //Retrieve only documents matching the specified tag
    Entry.find({ tags: req.params.tag })
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
}