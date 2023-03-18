const mongoose = require('mongoose')

const Image = mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    image: {
        data:Buffer,
        contentType: String
    }
})