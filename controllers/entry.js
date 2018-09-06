//Require packages
const mongoose = require('mongoose');
const Entry = require('../models/entry');
const dateFormat = require('dateformat');

/******************************************************/

//Create new post
module.exports.create = async (req, res) => {
    //Access date property
    const year = req.body.date.split(" ")[0];
    const initialDate = req.body.date;
    const initialMonth = req.body.date.split(" ")[2];
    const initialDay = req.body.date.split(" ")[4];

    let formatedDate = req.body.date;
    formatedDate = formatedDate.replace(/\s/g, '');
    formatedDate = dateFormat(formatedDate, 'dddd, mmmm, dS, yyyy');
    formatedDate = formatedDate.replace(/,/g, '');
    formatedDate = formatedDate.split(" ");

    //Declare new entry
    const entry = new Entry({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        date: {
            year: year,
            initial: {
                full: initialDate,
                month: initialMonth,
                day: initialDay
            },
            formated: {
                full: formatedDate,
                month: formatedDate[1],
                day: {
                    number: formatedDate[2],
                    string: formatedDate[0]
                }
            }
        },
        time: {
            initial: req.body.time,
            updated: req.body.time
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
module.exports.update_id = async (req, res) => {
    //Select Entry and pass new data

    //Access date property
    const year = req.body.date.split(" ")[0];
    const initialDate = req.body.date;
    const initialMonth = req.body.date.split(" ")[2];
    const initialDay = req.body.date.split(" ")[4];

    let formatedDate = req.body.date;
    formatedDate = formatedDate.replace(/\s/g, '');
    formatedDate = dateFormat(formatedDate, 'dddd, mmmm, dS, yyyy');
    formatedDate = formatedDate.replace(/,/g, '');
    formatedDate = formatedDate.split(" ");

    const data = req.body;
    delete data.date;

    data.date = new Object();
    data.date.initial = new Object();
    data.date.formated = new Object();

    data.date.formated.day = new Object();
    data.date.formated.full = new Array();


    data.date.initial.full = initialDate;
    data.date.initial.month = initialMonth;
    data.date.initial.day = initialDay;

    data.date.formated.day.number = formatedDate[2];
    data.date.formated.day.string = formatedDate[0];

    data.date.formated.month = formatedDate[1];

    data.date.year = year;

    data.date.formated.full = formatedDate;

    Entry.findByIdAndUpdate(req.params.id, data, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: `Handling PUT requests to /update_id/${req.params.id}`, data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

//PUT requst for entrys by title
module.exports.update_title = async (req, res) => {
    // Select Entry and pass new data

    //Access date property
    const year = req.body.date.split(" ")[0];
    const initialDate = req.body.date;
    const initialMonth = req.body.date.split(" ")[2];
    const initialDay = req.body.date.split(" ")[4];

    let formatedDate = req.body.date;
    formatedDate = formatedDate.replace(/\s/g, '');
    formatedDate = dateFormat(formatedDate, 'dddd, mmmm, dS, yyyy');
    formatedDate = formatedDate.replace(/,/g, '');
    formatedDate = formatedDate.split(" ");

    const data = req.body;
    delete data.date;

    data.date = new Object();
    data.date.initial = new Object();
    data.date.formated = new Object();

    data.date.formated.day = new Object();
    data.date.formated.full = new Array();


    data.date.initial.full = initialDate;
    data.date.initial.month = initialMonth;
    data.date.initial.day = initialDay;

    data.date.formated.day.number = formatedDate[2];
    data.date.formated.day.string = formatedDate[0];

    data.date.formated.month = formatedDate[1];

    data.date.year = year;

    data.date.formated.full = formatedDate;

    console.log(req.params)

    Entry.findOneAndUpdate(req.params.title, data, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: `Handling PUT requests to /update_title/${req.params.title}`, data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

/******************************************************/

//GET request for all
module.exports.retrieve_all = async (req, res) => {
    //Retrieve all documents in DB
    Entry.find({})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/retrieve_all',
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
module.exports.retrieve_archived = async (req, res) => {
    console.log('test');
    //Retrieve all documents in DB
    Entry.find({ archived: true })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/retrieve_archived',
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
module.exports.retrieve_id = async (req, res) => {
    //Retrieve only documents matching the specified ID
    Entry.findById(req.params.id)
        .exec()
        .then((result) => {
            res.status(200).json({
                message: `Handling GET requests to /get/${req.params.id}`,
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
module.exports.retrieve_title = async (req, res) => {
    //Retrieve only documents matching the specified TITLE    
    Entry.find({ title: req.params.title })
        .then((result) => {
            res.status(200).json({
                message: `Handling GET requests to /get/retrieve_title/${req.params.title}`,
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
module.exports.retrieve_author = async (req, res) => {
    //Retrieve only documents matching the specified AUTHOR
    Entry.find({ author: req.params.author })
        .then((result) => {
            res.status(200).json({
                message: `Handling GET requests to /get/retrieve_author${req.params.author}`,
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

//GET all by year  || NOT IN USE
// module.exports.retrieve_year = async (req, res) => {
//     // Retrieve only documents matching the specified YEAR
//     Entry.find({ 'date.year': req.params.year })
//         .then((result) => {
//             res.status(200).json({
//                 message: 'Handling GET requests to /get/',
//                 data: result
//             });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error
//             });
//         });
// }

//GET all by month || NOT IN USE
// module.exports.retrieve_month = async (req, res) => {
//     let month = req.params.month;
//     if (month.length < 3) parseInt(req.params.month);
//     // Check if month is a number
//     if (isNaN(month)) {
//         //     // Retrieve only documents matching the specified MONTH
//         Entry.find({ 'date.month.formated': month })
//             .then((result) => {
//                 res.status(200).json({
//                     message: 'Handling GET requests to /get/',
//                     data: result
//                 });
//             })
//             .catch((error) => {
//                 res.status(500).json({
//                     error: error
//                 });
//             });
//     } else {
//         // Retrieve only documents matching the specified MONTH
//         Entry.find({ 'date.month.default': month })
//             .then((result) => {
//                 res.status(200).json({
//                     message: 'Handling GET requests to /get/',
//                     data: result
//                 });
//             })
//             .catch((error) => {
//                 res.status(500).json({
//                     error: error
//                 });
//             });
//     }
// }

//GET all by day || NOT IN USE
// module.exports.retrieve_day = async (req, res) => {
//     const day = req.params.day;
//     //Check if day is a number
//     if (isNaN(day)) {
//         // Retrieve only documents matching the specified DAY
//         Entry.find({ 'date.day.formated[0]': req.params.daty })
//             .then((result) => {
//                 res.status(200).json({
//                     message: 'Handling GET requests to /get/',
//                     data: result
//                 });
//             })
//             .catch((error) => {
//                 res.status(500).json({
//                     error: error
//                 });
//             });
//     } else {
//         // Retrieve only documents matching the specified DAY
//         Entry.find({ 'date.day.default': req.params.day })
//             .then((result) => {
//                 res.status(200).json({
//                     message: 'Handling GET requests to /get/',
//                     data: result
//                 });
//             })
//             .catch((error) => {
//                 res.status(500).json({
//                     error: error
//                 });
//             });
//     }
// }

//GET all by TYPE
module.exports.retrieve_type = async (req, res) => {
    //Retrieve only documents matching the specified TYPE
    const type = req.params.type;
    const type_blog = 'blog';
    const type_project = 'project';
    const type_tutorial = 'tutorial';

    if (type === type_blog || type === type_project || type === type_tutorial) {
        Entry.find({ type: req.params.type })
            .then((result) => {
                res.status(200).json({
                    message: `Handling GET requests to /get/retrieve_type/${req.params.type}`,
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

//GET all by tag
module.exports.retrieve_tag = async (req, res) => {
    //Retrieve only documents matching a specified tag
    let tag = req.params.tag;
    tag = tag.toUpperCase();
    Entry.find({ tags: tag })
        .then((result) => {
            res.status(200).json({
                message: `Handling GET requests to /get/${req.params.tag}`,
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
module.exports.remove = async (req, res) => {
    console.log('test');
    //Remove all documents from DB
    Entry.remove((error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /remove/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    })
};

//DELETE request for entrys by id
module.exports.remove_id = async (req, res) => {
    //Remove all documents matching the specifed id
    Entry.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: `Handling DELETE requests to /remove_id/${req.params.id}`, data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

//DELETE request for entrys by title
module.exports.remove_title = async (req, res) => {
    //Remove all documents matching the specifed title
    Entry.findOneAndRemove(req.params.title, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: `Handling DELETE requests to /remove_title/${req.params.title}`, data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//DELETE request for entrys by author
module.exports.remove_author = async (req, res) => {
    //Remove all documents matching the specifed author
    Entry.deleteMany({ author: req.params.author }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: `Handling DELETE requests to /remove_author/${req.params.title}`, data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}