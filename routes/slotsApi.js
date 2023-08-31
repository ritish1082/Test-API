let express = require('express');
let router = express.Router();
const Model = require('../models/slotsCollectionsModel.js');
const UserModel = require('../models/userCollectionsModel.js');

router.route('/getSlots/:date').get(async (req, res) => {
    try{
        let date = req.params.date;
        console.log(req.params.date)
        const data = await Model.findOne({date: date});
        console.log(data['slots']);
        res.status(200).json({slots: data['slots']});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.route('/bookSlots').post(async (req, res) => {
    try{
        let updatedData = req.body.params;
        let options = {upsert: true, new: true};

        console.log(updatedData)

        const data = new Model({
            date: req.body.date,
            slots: req.body.slots
        })
        const dataToSave = await Model.findOneAndUpdate({date: req.body.params.date}, updatedData, options);
        res.status(200).json(dataToSave);
    }
    catch(err){
        res.status(400).json({message: "failed"});
    }
})

router.route('/updateUserSlots').post(async (req, res) => {
    try{
        let options = {upsert: true, new: true};

        const data = await UserModel.findOne({mail: req.body.params.mail});
        data['slots'].push({date: req.body.params.date, slots: [...req.body.params.slots]})

        const updatedData = data;

        console.log('update data', updatedData)

        const dataToSave = await UserModel.findOneAndUpdate({mail: req.body.params.mail}, updatedData, options);
        res.status(200).json(dataToSave);
    }
    catch(err){
        res.status(400).json({message: "failed"});
    }
})

router.route('/myBookings/:mail').get(async (req, res) => {
    try {
        console.log(req.params.mail)
        const data = await UserModel.findOne({mail: req.params.mail});
        res.status(200).json({slots: data['slots']})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

router.route('/deleteMyBookings').post(async (req, res) => {
    try {
        const data = await UserModel.findOne({mail: req.body.params.mail})
        data['slots'].splice(req.body.params.idx, 1)
        
        await UserModel.findOneAndUpdate({mail: req.body.params.mail}, data)

        res.status(200).json({slots: data['slots']})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;