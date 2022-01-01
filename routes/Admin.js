const express = require('express')
const User = require('/models/User');
const Transaction = require('../models/Transaction');
const router = express.Router()

router.post('/', (req, res) => {

    // Return all Users, Transactions,
    var data = {
        users: [{}]
    }
})

module.exports = router