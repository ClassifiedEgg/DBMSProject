const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    workouts: [
        {
            workout: {
                type: mongoose.Types.ObjectId,
                ref: 'workout'
            }
        }
    ],
    diet: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'diet'
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

module.exports = User = mongoose.Schema("user", UserSchema)