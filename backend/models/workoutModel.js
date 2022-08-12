const mongoose = require("mongoose")
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title:{
        type: String, 
        required: true
    },
    reps:{
        type: String, 
        required: true
    },
    load:{
        type: Number, 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

module.exports = mongoose.model("Workout", workoutSchema)