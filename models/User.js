const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
    password: {
        type: String,
        required: true
    },
    workouts: [
        {
            workout: {
                type: Schema.Types.ObjectId,
                ref: 'workout'
            }
        }
    ],
    diets: [
        {
            diet: {
                type: Schema.Types.ObjectId,
                ref: 'diet'
            }
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model("user", UserSchema)

module.exports = User