//Require packages
const mongoose = require('mongoose');
const Stats = require('../models/statistics');

//Create new statistics document
module.exports.create = async (req, res) => {
    //Create new instance of stats
    const stats = new Stats({
        _id: mongoose.Types.ObjectId(),
        daily: 0,
        weekly: 0,
        monthly: 0
    });
    //Save stats to DB
    try {
        await stats.save();
        res.status(200).json({
            message: 'Handling POST requests to /statistics/',
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

module.exports.remove = async (req, res) => {
    Stats.remove({}, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//Handle retriving visits visits
module.exports.retrieve = async (req, res) => {
    // console.log('test');
    try {
        //Retrieve all documents in DB
        const results = await Stats.find({}).exec()
        if (results.length) {
            res.status(200).json({
                message: 'Handling GET requests to /get/',
                data: results
            });
        } else {
            res.status(500).json({
                error: 'Unable to retrieve posts'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

module.exports.daily = async (req, res) => {
    //Post new visit
    // Stats.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, result) => {
    //     if (error) return res.status(500).json({ error: 'error' });
    //     if (result) return res.status(200).json({ message: 'Handling PUT requests to /delete/', data: result });
    //     return res.status(404).json({ data: "Nothing is removed" });
    // });
    try {
        const findStat = Stats.findById(req.params.id).exec();
        if (findStat.length) {
            const updateStat = findStat.uo
            res.status(200).json({
                message: 'Handling PUT requests to /delete/',
                data: result
            });
        } else {
            res.status(500).json({
                error: 'error'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'error'
        });
    }
}