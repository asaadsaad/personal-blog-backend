//Require packages
const mongoose = require('mongoose');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Create new admin
module.exports.create = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    //Create new instance of Admin
    const admin = new Admin({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hash,
        active: true
    });
    //Save new admin to DB
    try {
        await admin.save()
        res.status(200).json({
            message: 'Handling POST requests to /admin/',
            data: admin
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}

//Login admin
module.exports.login = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            username: req.body.username
        }).exec();
        const result = await bcrypt.compare(req.body.password, admin.password);
        if (result) {
            const token = jwt.sign({
                id: admin._id,
                username: admin.username
            }, 'shhhhh');
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

//Retrieve all admin
module.exports.retrieve = async (req, res) => {
    try {
        //Retrieve admin info
        const retrieveAdminInfo = await Admin.find({}).exec();
        if (retrieveAdminInfo.length) {
            //Send admin info
            res.status(200).json({
                message: 'Retrieving admin info...',
                data: retrieveAdminInfo
            });
        } else {
            //Send error info
            res.status(500).json({
            message: 'Admin not found'
            });   
        }
    } catch (error) {
        //Send error as response
        res.status(404).json({
            message: 'ERROR! Admin info could not be retrieved',
            data: error
        });
    }
};

//Retrieve admin info with ID
module.exports.retrieve_id = async (req, res) => {
    try {
        //Retrieve admin info
        const retrieveAdminInfo = await Admin.findById(req.params.id).exec();
        if (retrieveAdminInfo) {
            //Send admin info
            res.status(200).json({
                message: 'Retrieving admin info...',
                data: retrieveAdminInfo
            });
        } else {
            //Send error info
            res.status(500).json({
            message: 'Admin not found'
            });   
        }
    } catch (error) {
        //Send error as response
        res.status(404).json({
            message: 'ERROR! Admin info could not be retrieved',
            data: error
        });
    }
};

//Retrieve only active admin info
module.exports.retrieve_active = async (req, res) => {
    try {
        //Retrieve admin info
        const retrieveAdminInfo = await Admin.find({active: true}).exec();
        if (retrieveAdminInfo) {
            //Send admin info
            res.status(200).json({
                message: 'Retrieving admin info...',
                data: retrieveAdminInfo
            });
        } else {
            //Send error info
            res.status(500).json({
            message: 'Admin not found'
            });   
        }
    } catch (error) {
        //Send error as response
        res.status(404).json({
            message: 'ERROR! Admin info could not be retrieved',
            data: error
        });
    }
};

//Retrieve only deActive admin info
module.exports.retrieve_unactive = async (req, res) => {
    try {
        //Retrieve admin info
        const retrieveAdminInfo = await Admin.find({active: false}).exec();
        if (retrieveAdminInfo) {
            //Send admin info
            res.status(200).json({
                message: 'Retrieving admin info...',
                data: retrieveAdminInfo
            });
        } else {
            //Send error info
            res.status(500).json({
            message: 'Admin not found'
            });   
        }
    } catch (error) {
        //Send error as response
        res.status(404).json({
            message: 'ERROR! Admin info could not be retrieved',
            data: error
        });
    }
};

//Remove all admin
module.exports.remove = (req, res) => {
    Admin.remove({}, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//Remove admin
module.exports.remove_id = (req, res) => {
    Admin.remove({_id: req.params.id}, (error, result) => {
        if (error) return res.status(500).json({ error: 'error' });
        if (result) return res.status(200).json({ message: 'Handling DELETE requests to /delete/', data: result });
        return res.status(404).json({ data: "Nothing is removed" });
    });
}

//Archive admin
module.exports.archive = async (req, res) => {
    try {
        //Retreive admin
        const retrieveAdmin = await Admin.findById(req.params.id).exec();
        if (retrieveAdmin) {
            //Set active to FALSe
            retrieveAdmin.active = false;
            try {
                //Save admin
                await retrieveAdmin.save();
                    res.status(200).json({
                        message: 'Updating admin',
                        data: retrieveAdmin
                    });
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        } else {
            console.log('error');
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}
//Update admin
module.exports.update = async (req, res) => {
    try {
        const retrieveAdmin = await Admin.findById(req.params.id).exec();
        if (retrieveAdmin) {
            retrieveAdmin.username = req.body.username;
            try {
                await retrieveAdmin.save();
                    res.status(200).json({
                        message: 'Updating admin',
                        data: retrieveAdmin
                    });
            } catch (error) {
                res.status(500).json({
                    error: error
                });
            }
        } else {
            console.log('error');
        }
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
}