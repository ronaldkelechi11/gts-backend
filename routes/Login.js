const express = require('express')
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router()

router.post('/', async (req, res) => {
    var loggingUser = req.body.user

    var email = loggingUser.email
    var password = loggingUser.password

    const user = await User.findOne({ email: email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            user.password = ""
            res.status(200).send(user)
        }
        else {
            // wrong password
            res.status(401).send()
        }
    }
    else {
        res.status(501).send()
        console.log("User doesn't exist");
    }
})

module.exports = router