// Name of the exercise, date, parts of the body worked on, cals burnt, reps, 
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    workoutName: {
        type: String,
        required: true
    },
    allExercises: [
        {
            name: {
                type: String,
                required: true
            },
            reps: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    madeBy: {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        username: {
            type: String,
            required: true
        }
    }
})

const Workout = mongoose.model("workout", WorkoutSchema)

module.exports = Workout