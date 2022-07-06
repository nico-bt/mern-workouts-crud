import React from 'react'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

//Date format
import {formatDistanceToNow} from "date-fns"

function WorkoutDetails(props) {
    const {title, reps, load, createdAt, _id} = props.workout
    const {dispatch} = useWorkoutsContext()

    // Delete request to erase from Database
    const handleDelete = async ()=>{
        const response = await fetch("http://localhost:4000/api/workouts/" + _id, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })
        if(response.ok){
            dispatch({type: "DELETE_WORKOUT", payload: _id})
        }
    }

  return (
    <div className='workout-details'>
        <h4>{title}</h4>
        <p><strong>Load (kg): </strong>{load}</p>
        <p><strong>Reps: </strong>{reps}</p>
        <p>Created: {formatDistanceToNow( new Date(createdAt), { addSuffix: true })}</p>
        <span className='material-symbols-outlined' onClick={handleDelete}>Delete</span>
    </div>
  )
}

export default WorkoutDetails