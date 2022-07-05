import React, { useState } from 'react'

function WorkoutForm({setWorkouts}) {
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const newWorkout = {title, load, reps}
        
        // Send newWorkout to Database via a POST request
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            body: JSON.stringify(newWorkout),
            headers: {"Content-Type": "application/json"}
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            // Reset the form
            setError(null)
            setTitle("")
            setLoad("")
            setReps("")
            // Pass the new workout to "Home" page, this will make it re-render without fetching all
            setWorkouts((prev)=>{
                return [json, ...prev]
            })
        }
    }

    return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Exercise</h3>

        <label>Excercise: </label>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
        
        <label>Load (kg): </label>
        <input type="number" value={load} onChange={(e)=>{setLoad(e.target.value)}}></input>
        
        <label>Reps: </label>
        <input type="number" min={1} value={reps} onChange={(e)=>{setReps(e.target.value)}}></input>

        <button type='submit'>Add Exercise</button>

        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm