const express = require("express")
const router = express.Router({mergeParams:true})
const mongoose = require("mongoose")
const Workout = require("../models/workoutModel")

// Controllers
const {getAllWorkouts, createNewWorkout, getSingleWorkout, deleteWorkout, updateWorkout} = require("../controllers/workoutControllers")

// Middleware for authorization
router.use(require("../middleware/requireAuth"))

// GET all workouts | endpoint: /api/workouts/
router.get("/", getAllWorkouts)

// CREATE a New workout | endpoint: /api/workouts/
router.post("/", createNewWorkout)

// Get a SINGLE workout | endpoint: /api/workouts/:id
router.get("/:id", getSingleWorkout)

// Update a workout | endpoint: /api/workouts/:id
router.patch("/:id", updateWorkout)

// Delete a workout | endpoint: /api/workouts/:id
router.delete("/:id", deleteWorkout)

module.exports = router