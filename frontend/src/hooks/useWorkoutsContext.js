import { useContext } from 'react'
import { WorkoutsContext } from '../context/WorkoutContext'

function useWorkoutsContext() {
    // This returns the value of the context --> {state, dispatch}
    const context = useContext(WorkoutsContext)
    
    if(!context){
        throw Error("useWorkoutsContext must be used inside a WorkoutsContextProvider")
    }

  return context
}

export default useWorkoutsContext