const mongoose = require('mongoose')

const Entry = mongoose.model('Entry', {
    title:{
        type: String,
        trim: true,
        required: true 
    },
    body:{
        type: String,
        minlength: 20,
        required: true,
        trim: true 
    },
    date:{
        type: Date
    }
})

module.exports = Entry
