const mongoose = require('mongoose')

const landSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Name is required']
    },
    area: {
        type: Number,
        required: [true, 'Area is required'],
    },
    city: {
        type: String,
        trim: true,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        trim: true,
        required: [true, 'State is required']
    },
    country: {
        type: String,
        trim: true,
        required: [true, 'Country is required']
    }
}, {
    toJSON: { virtuals: true }
})
landSchema.virtual('id').get(function () {
    return this._id;
});

const Land = mongoose.model('Land', landSchema)

module.exports = Land