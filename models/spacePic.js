const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const spacePicSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        unique: true
    },
    url: {
        type: 'String',
        required: true
    },
    created_by: {
        type: 'String',
        required: true
    }
})

module.exports = mongoose.model('SpacePic', spacePicSchema)