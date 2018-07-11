
//Require packages
const mongoose = require('mongoose');
const Entry = require('../models/entry');

// PATCH requst for entrys by id
module.exports.patch_by_id = async (req, res) => {
    Entry.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

// PATCH requst for entrys by title
module.exports.patch_by_title = async (req, res) => {
    Entry.findOneAndUpdate(req.params.title, req.body, { new: true }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};