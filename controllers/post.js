//Require packages
const mongoose = require('mongoose');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.admin = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    //Declare new admin
    const admin = new Admin({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hash
    });
    //Save new admin to DB
    admin
        .save()
        .then((result) => {
            //Send status code 200 and json data
            res.status(200).json({
                message: 'Handling POST requests to /admin/',
                data: admin
            });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
}

module.exports.admin_login = async (req, res) => {
    try {

        const admin = await Admin.findOne({ username: req.body.username }).exec();
        console.log(admin)
        const result = await bcrypt.compare(req.body.password, admin.password);
        if (result) {
            const token = jwt.sign({ id: admin._id, username: admin.username }, 'shhhhh');
            res.status(200).json({
                message: 'Handling POST requests to /admin/',
                token: token
            });
        } else {
            res.status(401).json({
                message: 'error'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });

    };
}