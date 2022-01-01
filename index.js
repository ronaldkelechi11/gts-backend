const express = require('express')
const app = express()
const PORT = 4000 || process.env.PORT


// Middleware
app.use(express.json())
app.use(express.urlencoded())


//Getting Routes


// Assigning Routes

app.listen(PORT,
    () => {
        console.log(`App listening on port: ${PORT}`)
    }
)

