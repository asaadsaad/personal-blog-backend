//Require packages
const mongoose = require('mongoose');
const Entry = require('../models/entry');
const dateFormat = require('dateformat');

/******************************************************/

//Create new post
module.exports.create = async (req, res) => {
    //Access date property
    const year = req.body.date[0];

    const initialDate = req.body.date;
    const initialMonth = req.body.date[1];
    const initialDay = req.body.date[2];

    //Format date to appropriot version
    let formatedDate = dateFormat(initialDate, "dddd, mmmm, dS, yyyy");

    //Convert formatedDate into array
    formatedDate = formatedDate.split(', ');

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
            full: req.body.date,
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
            updated: null
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
                message: 'Handling POST requests to /create/',
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
module.exports.update_by_id = async (req, res) => {
    //Format date into acceptable form
    let date = req.body.date;

    //Format Date
    date = dateFormat(date, "dddd, mmmm, dS, yyyy");;

    //Convert formatedDate into array
    date = date.split(', ');

    const new_data = {
        title: req.body.title,
        author: req.body.author,
        date: date,
        time: req.body.time,
        tags: req.body.tags,
        type: req.body.type,
        data: req.body.data,
        archived: req.body.archived
    }

    Entry.findByIdAndUpdate(req.params.id, new_data, {new: true}, (error, result) => {
        if (error) return res.status(500).json({ error: 'Invalid criteria' });
        if (result) return res.status(200).json({
            message: `Handling PUT requests to /update_by_id/${req.params.id}`,
            updated: result
        });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

//PUT requst for entrys by title
module.exports.update_title = async (req, res) => {
    // //Access date property
    // const year = req.body.date.split(" ")[0];
    // const initialDate = req.body.date;
    // const initialMonth = req.body.date.split(" ")[2];
    // const initialDay = req.body.date.split(" ")[4];

    // let formatedDate = req.body.date;
    // formatedDate = formatedDate.replace(/\s/g, '');
    // formatedDate = dateFormat(formatedDate, 'dddd, mmmm, dS, yyyy');
    // formatedDate = formatedDate.replace(/,/g, '');
    // formatedDate = formatedDate.split(" ");

    // const data = req.body;
    // delete data.date;

    // data.date = new Object();
    // data.date.initial = new Object();
    // data.date.formated = new Object();

    // data.date.formated.day = new Object();
    // data.date.formated.full = new Array();


    // data.date.initial.full = initialDate;
    // data.date.initial.month = initialMonth;
    // data.date.initial.day = initialDay;

    // data.date.formated.day.number = formatedDate[2];
    // data.date.formated.day.string = formatedDate[0];

    // data.date.formated.month = formatedDate[1];

    // data.date.year = year;

    // data.date.formated.full = formatedDate;

    // console.log(req.params)

    // Entry.findOneAndUpdate(req.params.title, data, { new: true }, (error, result) => {
    //     if (error) return res.status(500).json({ error: 'error' });
    //     if (result) return res.status(200).json({ message: `Handling PUT requests to /update_title/${req.params.title}`, data: result });
    //     return res.status(404).json({ data: "Nothing is removed" });
    // });

    Entry.findOneAndUpdate(req.params.title, data, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: `Handling PUT requests to /update_title/${req.params.title}`, data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

/******************************************************/

//GET request for all
module.exports.retrieve = async (req, res) => {
    //Retrieve all documents in DB
    Entry.find({})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: 'Handling GET requests to /get/retrieve',
                data: result
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

//GET request for number of posts
module.exports.retrieve_amount = async (req, res) => {
    try {

        let type = req.params.type;

        //Associate post type numbers
        const type_blog = 1;
        const type_project = 2;
        const type_tutorial = 3;

        let search_all = undefined;

        //Convert type to Number
        if (type !== search_all) type = parseInt(type);

        //Return amount of all posts
        if (type === search_all) {
            //Perform request
            Entry.countDocuments({}, await function (error, count) {
                //Ensure no errors are present
                if (error)  return res.status(500).json({error: 'Invalid criteria'});
                //Send results
                if (count || count === 0) return res.status(200).json({
                    message: `Handling GET requests to /get/retrieve/`,
                    data: count
                });
                //Send no removel message
                return res.status(404).json({data: "Nothing is removed"});
            });
        } else if (type >= 1 && type <= 3) {
            //Return select post type amounts
            if (type === type_blog || type === type_project || type === type_tutorial) {
                //Perform request
                Entry.countDocuments({type: type}, await function (error, count) {
                    //Ensure no errors are present
                    if (error)  return res.status(500).json({error: 'Invalid criteria'});
                    //Send results
                    if (count || count === 0) return res.status(200).json({
                        message: `Handling GET requests to /get/retrieve/`,
                        data: `There is ${count} category ${type} post(s)`
                    });
                    //Send no removel message
                    return res.status(404).json({data: "Nothing is removed"});
                });
            }
        } else {
            //Send errors when an invalid query is present
            res.status(500).json({
                error: 'Invalid criteria'
            });
        }

    } catch (error) {
        res.status(500).json({
            error: `Error : ${error}`
        });
    }
}

//GET request for all
module.exports.retrieve_archived = async (req, res) => {
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
        .exec()
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
        .exec()
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    message: `Handling GET requests to /get/retrieve_author${req.params.author}`,
                    data: result
                });
            } else {
                res.status(500).json({
                    error: 'Invalid criteria'
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

//GET all by year
module.exports.retrieve_year = async (req, res) => {
    // Retrieve only documents matching the specified YEAR
    Entry.find({ 'date.year': req.params.year })
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
}

// GET all by month
// Make sure string name entered is valid && make sure to properly desplay errors
module.exports.retrieve_month = async (req, res) => {
    try {
        let month = req.params.month;
        //Ensure month is valid
        let valid_month = false;
        //Boolean variable to handle any errors which may have been triggered
        let error = false;
        //Hold all valid months
        const possible_months = {
            first: "January",
            second: "Febuary",
            third: "March",
            fourth: "April",
            fifth: "May",
            sixth: "June",
            seventh: "July",
            eight: "August",
            ninth: "September",
            tenth: "October",
            eleventh: "November",
            twelfth: "December"
        }
        //Convert string to integer if month is in number format
        if (month.length < 3) {
            month = parseInt(month);
            //Ensure month is ranginf from 1 - 12
            if (month <= 12 && month >= 1) {
                const data = await Entry.find({'date.initial.month': month}).exec();
                //Ensure no empty data is returned
                if (data.length > 0) {
                    res.status(200).json({
                        message: `Handling GET requests to /retrieve_month/${month}`,
                        data: data
                    });
                } else {
                    error = true;
                }
            } else {
                error = true;
            }
            //Check for months in the form of words
        } else {
            //Ensure that month string is matching valid months
            //Loop through all months and check match with user input
            for (let entry in possible_months) {
                if (possible_months.hasOwnProperty(entry)) {
                    //Check matching month
                    if (month === possible_months[entry]) {
                        valid_month = true; 
                    }
                }
            }
            //Perform request once month is validated
            if (valid_month) {
                //Send request for search
                const data = await Entry.find({'date.formated.month': month}).exec();
                //Ensure that valid data is present
                if (data.length > 0) {
                    res.status(200).json({
                        message: `Handling GET requests to /retrieve_month/${month}`,
                        data: data
                    });
                } else {
                    error = true;
                }
            } else {
                error = true;
            }
        }
        //Handle any errors which may have been triggered
        if (error) {
            res.status(500).json({
                error: 'Invalid criteria'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//GET all by day || NOT IN USE
module.exports.retrieve_day = async (req, res) => {
    try {
        let day = req.params.day;
        //Check for valid day
        let valid_day = false;
        //Boolean for handling any occuring errors
        let error = false;
        //Hold all possible day values
        const possible_days = {
            first: "Monday",
            second: "Tuesday",
            third: "Wednesday",
            fourth: "Thursday",
            fifth: "Friday",
            sixth: "Saturday",
            seventh: "Sunday"
        }
        //Check for number arguments
        if (day.length < 3) {
            //Convert string to integer
            day = parseInt(day);
            //Handles days between the first and last day of each month
            if (day <= 31 && day >= 1) {
                //Perform query for data
                const data = await Entry.find({'date.initial.day': day}).exec();
                //Check that data does not return empty
                if (data.length > 0) {
                    res.status(200).json({
                        message: `Handling GET requests to /retrieve_day/${day}`,
                        data: data
                    });
                } else {
                    error = true;
                }
            } else {
                error = true;
            }
            //Check for days in the form of words
        } else {
            //Ensure that day string is a valid day
            for (let entry in possible_days) {
                if (possible_days.hasOwnProperty(entry)) {
                    //Check matching day
                    if (day === possible_days[entry]) {
                        valid_day = true;
                    }
                }
            }
            //Perform request once day is validated
            if (valid_day) {
                //Send request for search
                const data = await Entry.find({'date.formated.day.string': day}).exec();
                //Ensure that valid data is present
                if (data.length > 0) {
                    res.status(200).json({
                        message: `Handling GET requests to /retrieve_month/${day}`,
                        data: data
                    }).end();
                } else {
                    error = true;
                }
            } else {
                error = true;
            }
        }
        if (error) {
            res.status(500).json({
                error: 'Invalid criteria'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//GET all by TYPE
module.exports.retrieve_type = async (req, res) => {
    //Retrieve only documents matching the specified TYPE
    try {
        const type = parseInt(req.params.type);
        const type_blog = 1;
        const type_project = 2;
        const type_tutorial = 3;

        //Check for any errors
        let error = false;

        //Check valid type is submitted
        if (type === type_blog || type === type_project || type === type_tutorial) {
            const data = await Entry.find({type: req.params.type}).exec();
            if (data.length > 0) {
                res.status(200).json({
                    message: `Handling GET requests to /get/retrieve_type/${req.params.type}`,
                    data: data
                });
            } else {
                error = true;
            }
        } else {
            error = true;
        }

        //Throw error message in the event invalide info is entered
        if (error) {
            res.status(500).json({
                message: `Handling GET requests to /get/retrieve_type/${req.params.type}`,
                data: `Invalid criteria`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error
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
    //Remove all documents from DB
    Entry.remove((error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({
            message: 'Handling DELETE requests to /remove/',
            data: `Removed ${result.n} post(s)`
        });
        return res.status(404).json({ data: "Nothing is removed" });
    })
};

//DELETE request for entrys by id
module.exports.remove_id = async (req, res) => {
    //Remove all documents matching the specifed id
    Entry.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: 'Invalid criteria' });
        if (result) return res.status(200).json({
            message: `Handling DELETE requests to /remove_id/${req.params.id}`,
            data: `Removed ${result.n} post(s)`

        });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

//DELETE request for entrys by title
module.exports.remove_title = async (req, res) => {
    //Remove all documents matching the specifed title
    Entry.deleteMany({title: req.params.title}, (error, result) => {
        console.log(result);
        if (error) return res.status(500).json({ error: 'Invalid criteria' });
        if (result.n) return res.status(200).json({
            message: `Handling DELETE requests to /remove_title/${req.params.title}`,
            data: `Removed ${result.n} post(s)`
        });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//DELETE request for entrys by author
module.exports.remove_author = (req, res) => {
    //Remove all documents matching the specifed author
    Entry.deleteMany({author: req.params.author}, (error, result) => {
        console.log(result);
        if (error) return res.status(500).json({ error: 'Invalid criteria' });
        if (result.n) return res.status(200).json({
            message: `Handling DELETE requests to /remove_title/${req.params.title}`,
            data: `Removed ${result.n} post(s)`
        });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}