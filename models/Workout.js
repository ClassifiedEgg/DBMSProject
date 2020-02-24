// Name of the exercise, date, parts of the body worked on, cals burnt, reps, 
const mongoose = require('mongoose')

const WorkoutSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true
    },
    details: [
        {
            reps: {
                type: Number
            },
            load: {
                type: Number
            }
        }
    ],
    date: {
        type: Date,
        required: true
    },
    madeBy: {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        userName: {
            type: String,
            required: true
        }
    }
})

module.exports = Workout = mongoose.Schema("workout", WorkoutSchema)