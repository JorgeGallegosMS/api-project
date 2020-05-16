require('dotenv').config()
const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DATABASE_URL, options);

mongoose.connection.on('connected', () => {
    // mongoose.connection.dropDatabase()
    console.log('Connected')
})

module.exports = mongoose.connection