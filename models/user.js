const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = User