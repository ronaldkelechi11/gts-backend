const express = require('express')
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router()

router.get('/', async (req, res) => {

    var data = {
        users: [{}],
        transactions: [{}],
        totalProfit: 0,
        totalVerified: 0
    }

    await User.find({})
        .then((result) => {
            data.users = result
        }).catch((err) => {
            console.log(err);
        });

    await Transaction.find({})
        .then((result) => {
            data.transactions = result
            result.forEach(element => {
                parseFloat(data.totalProfit += element.amount)
            });

            result.forEach(element => {
                if (element.verified) {
                    parseFloat(data.totalVerified++)
                }
            });
        }).catch((err) => {
            console.log(err);
        });

    res.send(data)
})



router.put("/:id", (req, res) => {
    var transactionId = req.params.id

    Transaction.findOneAndUpdate({ _id: transactionId }, { verified: true }
    ).then((result) => {
        // Find which user has the transaction return the transactions get the amout and then add it to his balance

        res.status(200).send()
    }).catch((err) => {
        console.log(err);
    });

})

module.exports = router