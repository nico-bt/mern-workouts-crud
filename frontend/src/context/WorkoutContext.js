import React, { useReducer } from 'react'
import { createContext } from "react";

// Create a global state, available for all components/pages 
// and keep in sync the db with local data --> [workouts]

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action)=>{
    switch (action.type) {
        case "SET_ALL_WORKOUTS":
            return {
                workouts: action.payload
            }
        case "CREATE_WORKOUT":
            return {
                workouts: [action.payload, ...state.workouts]
            }    
        case "DELETE_WORKOUT":
            return {
                // get the id as payload and filter actual state
                workouts: state.workouts.filter(item => item._id != action.payload)
            }
        default:
            return state
    }
}

export function WorkoutsContextProvider({children}) {
    const [state, dispatch] = useReducer( workoutsReducer, { workouts: null } ) //useReducer(reducer, state)

  return (
    <WorkoutsContext.Provider value={{...state, dispatch}}>
        {children}
    </WorkoutsContext.Provider>
  )
}
