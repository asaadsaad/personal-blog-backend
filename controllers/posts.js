//Require packages
const mongoose = require('mongoose');
const Entry = require('../models/entry');
const dateFormat = require('dateformat');

/******************************************************/

//Create new post
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
        data: { preview: req.body.data.preview, body: req.body.data.body },
        archived: req.body.archived
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

/******************************************************/

//PUT requst for entrys by id
module.exports.put_by_id = async (req, res) => {
    //Select Entry and pass new data
    Entry.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling PUT requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

//PUT requst for entrys by title
module.exports.put_by_title = async (req, res) => {
    // Select Entry and pass new data
    Entry.findOneAndUpdate(req.params.title, req.body, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

/******************************************************/

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

//GET request for all
module.exports.get_all_archived = async (req, res) => {
    //Retrieve all documents in DB
    Entry.find({ archived: true })
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

/***********************************************************/

//DELETE request for all
module.exports.delete_all = async (req, res) => {
    //Remove all documents from DB
    Entry.remove((error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    })
};

//DELETE request for entrys by id
module.exports.delete_by_id = async (req, res) => {
    //Remove all documents matching the specifed id
    Entry.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:id', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

//DELETE request for entrys by title
module.exports.delete_by_title = async (req, res) => {
    //Remove all documents matching the specifed title
    Entry.findOneAndRemove(req.params.title, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:title', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//DELETE request for entrys by author
module.exports.delete_by_author = async (req, res) => {
    //Remove all documents matching the specifed author
    Entry.deleteMany({ author: req.params.author }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:author', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//DELETE request for entrys by type
module.exports.delete_by_type = async (req, res) => {
    //Remove all documents matching the specifed type
    Entry.deleteMany({ type: req.params.type }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:date', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}