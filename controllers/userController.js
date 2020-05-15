const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Data to collect/confirm to have the app go
const fields = {
    email: {
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    }
};

//Create Schema
const userSchema = new Schema(fields);

module.exports = mongoose.model('User', userSchema);