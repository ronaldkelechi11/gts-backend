const express = require('express')
const User = require('../models/User');
const router = express.Router()

router.post('/', (req, res) => {

    var user = req.body.user

    var username = user.username
    var email = user.email
    var telephone = user.telephone
    var password = user.password


    User.findOne({ email })
        .then((response) => {
            if (response == null) {

                var user = new User({
                    username: username,
                    email: email,
                    telephone: telephone,
                    password: password,
                    balance: 0,
                    refferals: []
                })

                user.save()
                    .then((result) => {
                        res.send(username)
                    }).catch((err) => {
                        console.log(err);
                    });
            }
            else {
                // user exists
                res.status(409).send()
                console.log(`${email} already exists`);
            }
        })
        // Couldnt search if user exist
        .catch((err) => {
            console.log("Couldn't search if user exist " + err),
                res.status(501).send()
        })
})

module.exports = router