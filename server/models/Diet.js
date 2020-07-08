const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const DietSchema = new mongoose.Schema({
    dietName: {
        type: String,
        required: true,
    },
    macros: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    allMeals: [
        {
            name: {
                type: String,
                required: true
            },
            kcal: {
                type: String,
                required: true
            }
        }
    ],
    madeBy: {
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        userName: {
            type: String,
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Diet = mongoose.model("diet", DietSchema)

module.exports = Diet