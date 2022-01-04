const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    }
})
module.exports = mongoose.model("Transaction", transactionSchema)