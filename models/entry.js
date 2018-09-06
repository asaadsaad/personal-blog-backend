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
            full: String,
            month: String,
            day: String
        },
        formated: {
            full: [String, String, String, String],
            month: String,
            day: {
                number: String,
                string: String
            }
        }
    },
    time: {
        initial: String,
        updated: String
    },
    tags: Array,
    type: String,
    data: {
        preview: String,
        body: String
    },
    archived: Boolean
});

module.exports = mongoose.model('Entry', postSchema);