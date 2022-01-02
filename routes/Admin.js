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


// Transaction verified
router.put("/:id", (req, res) => {
    var transactionId = req.params.id

    /*

    Finds the transaction with the param ID returns the user attached to it. Then gets the amount and gets the user's account balance and sums it up very rowdy code. :) 
    
    */
    // Reason why it is bad code is because it runs to many queries to the database will improve on it

    var transaction = Transaction.findOneAndUpdate
        ({ _id: transactionId }, { verified: true }
        ).then(async (result) => {
            const user = await User.findOne({ _id: result.user })
            if (user) {
                var newBalance = parseFloat(result.amount + user.balance)
                User.findOneAndUpdate({ _id: result.user }, { balance: newBalance }).then((result) => {
                    res.status(200).send()
                }).catch((err) => {
                    res.send(501).send(err)
                });
            }
            else {
                res.status(409).send()
            }
        }).catch((err) => {
            console.log(err);
        });

})

module.exports = router