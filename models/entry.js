//Require mongoose
const mongoose = require('mongoose');

//Initilize new schema
const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: Array,
    author: String,
    date: {
        initial: Array,
        year: String,
        month: {
            default: String,
            formated: [String]
        },
        day: {
            default: String,
            formated: [String, String]
        }
    },
    time: {
        initial: String,
        set: String
    },
    tags: Array,
    type: String,
    data: {
        preview: String,
        body: String
    }
});

module.exports = mongoose.model('Entry', postSchema);