const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

let checkAuth = (req, res, next) => {
    if (typeof req.cookies.api_token === "undefined" || req.cookies.api_token === null) {
        req.user = null
    } else {
        let token = req.cookies.api_token
        let decodedToken = jwt.decode(token, { complete: true }) || {}
        req.user = decodedToken.payload
    }

    next()
}

const app = express()

require('./db/spacePic-db')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(checkAuth)

app.get('/', (req, res) => {
    res.redirect('/pics')
})

require('./controllers/spacePic.js')(app)
require('./controllers/user.js')(app)

app.listen(3000, () => {
    console.log('listening')
})

module.exports = app