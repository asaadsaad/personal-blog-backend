//Require packages
const mongoose = require('mongoose');
const Entry = require('../models/entry');

//DELETE request for all
module.exports.delete_all = async (req, res) => {
    //Remove all documents from DB
    Entry.remove((error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    })
};

//DELETE request for entrys by id
module.exports.delete_by_id = async (req, res) => {
    //Remove all documents matching the specifed id
    Entry.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:id', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
};

//DELETE request for entrys by title
module.exports.delete_by_title = async (req, res) => {
    //Remove all documents matching the specifed title
    Entry.findOneAndRemove(req.params.title, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:title', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//DELETE request for entrys by author
module.exports.delete_by_author = async (req, res) => {
    //Remove all documents matching the specifed author
    Entry.deleteMany({ author: req.params.author }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:author', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//DELETE request for entrys by type
module.exports.delete_by_type = async (req, res) => {
    //Remove all documents matching the specifed type
    Entry.deleteMany({ type: req.params.type }, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:date', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//DEPRECATED: Not sure if ill use this yet
//DELETE request for entrys by date
// module.exports.delete_by_date = async (req, res) => {
//     Entry.findOneAndRemove(req.params.date, (error, result) => {
//         if (error) return res.status(500).json({ error: 'error' });
//         if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:date', data: result });
//         return res.status(404).json({ data: "Nothing is removed" });
//     });
// }

//DEPRECATED: Not sure if ill use this yet
//DELETE request for entrys by tag
// module.exports.delete_by_tag = async (req, res) => {
//     Entry.findOneAndRemove(req.params.tag, (error, result) => {
//         if (error) return res.status(500).json({ error: 'error' });
//         if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/:date', data: result });
//         return res.status(404).json({ data: "Nothing is removed" });
//     });
// }