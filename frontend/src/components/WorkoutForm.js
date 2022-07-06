import React, { useState } from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

function WorkoutForm({setWorkouts}) {
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {workouts, dispatch} = useWorkoutsContext()

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
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            // Reset the form
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            // Pass the new workout to "Home" page, this will make it re-render without fetching all
            dispatch({
                type: "CREATE_WORKOUT",
                payload: json
            })
        }
    }

    return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Exercise</h3>

        <label>Excercise: </label>
        <input 
            type="text" 
            value={title} 
            onChange={(e)=>{setTitle(e.target.value)}}
            className= {emptyFields.includes("title")? "error" : ""}>
        </input>
        
        <label>Load (kg): </label>
        <input 
            type="number" 
            value={load} 
            onChange={(e)=>{setLoad(e.target.value)}}
            className= {emptyFields.includes("load")? "error" : ""}>
        </input>
        
        <label>Reps: </label>
        <input 
            type="number" min={1} 
            value={reps} 
            onChange={(e)=>{setReps(e.target.value)}}
            className= {emptyFields.includes("reps")? "error" : ""}>
        </input>

        <button type='submit'>Add Exercise</button>

        {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm