const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 64
    },
    telephone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 64
    },
    balance: {
        type: Number,
        required: true,
        maxLength: 7,
        minLength: 1
    },
    refferalCode: {
        type: String,
        required: true
    },
    refferals: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        }
    ]
})

// Encrypt the password
userSchema.pre('save', async function (next) {
    var salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

module.exports = mongoose.model("User", userSchema)