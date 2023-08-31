let express = require('express');
let router = express.Router();
const Model = require('../models/otpCollectionsModel.js');
const UserModel = require('../models/userCollectionsModel.js');

router.route('/postOtp').post(async (req, res) => {
    try{
        let updatedData = req.body;
        let options = {new: true, upsert: true};

        const data = new Model({
            mail: req.body.mail,
            otp: req.body.otp
        })
        const dataToSave = await Model.findOneAndUpdate({mail: req.body.mail}, updatedData, options);
        res.status(200).json(dataToSave);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.route('/validateOtp').post(async (req, res) => {
    try{
        let data = req.body;
        let login = false;
    
        const dbData = await Model.findOne({mail: data.mail});
        if(data['otp'] === dbData['otp']) login = true;
        res.status(200).json({'login': login});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.route('/createUser').post(async (req, res) => {
    const data = new UserModel({
        userName: req.body.userName,
        mail: req.body.mail,
        slots: []
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);    
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;