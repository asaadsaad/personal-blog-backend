//Require mongoose
const mongoose = require('mongoose');

//Setup new schema
const statisticsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    daily: Number,
    weekly: Number,
    monthly: Number
});

module.exports = mongoose.model('Stats', statisticsSchema);