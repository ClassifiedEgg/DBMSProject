// cals and macros, bf, dinner, lunhc, snacks, drinks, water, date, 
const mongoose = require('mongoose')

const DietSchema = new mongoose.Schema({
    name: {
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
    food: [
        {
            item: {
                type: String,
                required: true
            },
            servings: {
                type: String,
                required: true
            },
            time: {
                type: Date,
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

module.exports = Diet = mongoose.Schema("diet", DietSchema)