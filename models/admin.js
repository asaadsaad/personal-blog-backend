//Require mongoose
const mongoose = require('mongoose');

//Initilize new schema
const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
});

module.exports = mongoose.model('Admin', adminSchema);