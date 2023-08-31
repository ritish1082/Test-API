const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String
    },
    mail: {
        required: true,
        type: String
    },
    slots: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('userSchema', userSchema);