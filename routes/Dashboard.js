const express = require('express')
const multer = require('multer');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const router = express.Router()
const path = require('path');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        //This is the name the file is changed into
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
    destination: (req, file, cb) => {
        cb(null, "public/images");
    }
})
const upload = multer({ storage: storage })


router.get('/:username', async (req, res) => {
    var username = req.params.username

    const user = await User.findOne({ username: username })
    if (user) {
        user.password = ""
        res.status(200).send(user)
    }
    else {
        res.status(501).send()
        console.log("User doesn't exist");
    }
})


//  Deposit Route
router.post("/:username/deposit", upload.single('file'), async (req, res) => {
    var username = req.params.username

    const transaction = new Transaction({
        amount: req.body.amount,
        category: req.body.category,
        coin: req.body.coin,
        file: req.file.filename,
        verified: false
    })

    await transaction.save()
        .then(async (result) => {
            var newTransaction = result._id
            const user = await User.findOne({ username: username })
            if (user) {
                var newBalance = parseFloat(user.balance) + parseFloat(req.body.amount)
                user.balance = newBalance
                user.transactions.push(newTransaction)

                user.updateOne({ balance: newBalance, transactions: user.transactions })
                    .then((result) => {
                        res.status(200).send()
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        }).catch((err) => {
            console.log(err);
        });
})

router.get("/:username/transactions", async (req, res) => {
    const username = req.params.username

    const user = await User.findOne({ username: username })

    if (user) {
        user.password = ""
        user.populate("transactions")
            .then((result) => {
                res.status(200).send(user)
            }).catch((err) => {
                res.status(501).send()
            });
    }
    else {
        res.status(409).send()
    }

})

module.exports = router