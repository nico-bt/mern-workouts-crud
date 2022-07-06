const mongoose = require("mongoose")
const Workout = require("../models/workoutModel")

const getAllWorkouts = async (req, res)=>{
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const createNewWorkout = async (req, res)=>{
    const {title, reps, load} = req.body
    
    // Pass to the frontend wich fields are empty 
    const emptyFields=[]
    if(!title){emptyFields.push("title")}
    if(!reps){emptyFields.push("reps")}
    if(!load){emptyFields.push("load")}
    // don't try to create an item in db untill all fields are filled
    if(emptyFields.length>0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try {
        const workout = await Workout.create({title, reps, load})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getSingleWorkout = async (req, res)=>{
    // Check if the passed id is a valid mongoDb type
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({error: "No such workout in db"}) 
    }
    
    try {
        const workout = await Workout.findById(req.params.id)
        if(!workout){
            return res.status(400).json({error: "No such workout in db"})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const deleteWorkout = async (req, res)=>{    
    // Check if the passed id is a valid mongoDb type
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).json({error: "No such workout in db"}) 
    }

    try {
        const workout = await Workout.findByIdAndDelete(req.params.id)
        if(!workout){
            return res.status(400).json({error: "No such workout in db"})
        }
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

const updateWorkout = async(req, res)=>{
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
        res.status(200).json(updatedWorkout)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = {getAllWorkouts, createNewWorkout, getSingleWorkout, deleteWorkout, updateWorkout}