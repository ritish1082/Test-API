const mongoose = require('mongoose');
const slotsSchema = new mongoose.Schema({
    date: {
        required: true,
        type: String
    },
    slots: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('slotsSchema', slotsSchema);