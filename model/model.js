const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: String,
    lastName: String,
    roll: String,
    mobileNumber: String,
    paidOn: String,
    paymentMode: String,
    feeAmount: String,
    feeName: String
})

const Model = mongoose.model('Model', schema);

module.exports = Model;