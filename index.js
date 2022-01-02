const express = require('express')
const cors = require('cors');
const { mongoose } = require('mongoose')
const app = express()

const PORT = 4000 || process.env.PORT
const dbUrl = "mongodb://127.0.0.1:27017/globalTechnologyServices"


// Middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

//Getting Routes
const signupRoute = require("./routes/Signup")
const loginRoute = require("./routes/Login")


// Assigning Routes
app.use("/signup", signupRoute)
app.use("/login", loginRoute)


app.listen(PORT,
    () => {
        console.log(`App listening on port: ${PORT}`)

        mongoose.connect(dbUrl)
            .then((result) => {
                console.log("Succesfully Connected to Mongo DB");
            }).catch((err) => {
                console.log("Error Connecting to Mongo DB");
            });
    }
)

