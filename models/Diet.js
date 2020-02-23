// cals and macros, bf, dinner, lunhc, snacks, drinks, water, date, 
const mongoose = require('mongoose')

const DietSchema = new mongoose.Schema({
    macros: [
        {
            name: {
                type: String
            },
            value: {
                type: Number
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
    date: {
        type: Date,

    }
})

module.exports = Diet = mongoose.Schema("diet", DietSchema)