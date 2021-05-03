const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true,'Email is required'],
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email entered is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        trim: true
    }
})


const User = mongoose.model('User', userSchema)

module.exports = User
