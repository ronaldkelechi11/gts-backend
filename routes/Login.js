const express = require('express')
const User = require('../models/User');
const router = express.Router()

router.post('/', async (req, res) => {
    var loggingUser = req.body.user

    var email = loggingUser.email
    var password = loggingUser.password

    if (email == "admin@globaltechnologyservices.web.app") {
        res.status(503).send()
    }
    else {
        const user = await User.findOne({ email: email })
        if (user) {
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
    }
})

module.exports = router