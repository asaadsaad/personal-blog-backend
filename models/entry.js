//Require mongoose
const mongoose = require('mongoose');

//Initilize new schema
const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    author: String,
    date: {
        year: String,
        initial: {
            full: Array,
            month: String,
            day: String
        },
        formated: {
            full: Array,
            month: String,
            day: {
                number: String,
                string: String
            }
        }
    },
    time: {
        initial: Array,
        updated: Array || null
    },
    tags: Array,
    type: String, //Eventually convert over to only string type
    data: {
        preview: String,
        body: String
    },
    archived: Boolean
});

module.exports = mongoose.model('Entry', postSchema);