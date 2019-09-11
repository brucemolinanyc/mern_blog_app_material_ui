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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Entry
