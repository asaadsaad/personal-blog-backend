//Require mongoose
const mongoose = require('mongoose');

//Initilize new schema
const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    datecreated: String,
    active: Boolean
});

module.exports = mongoose.model('Admin', adminSchema);