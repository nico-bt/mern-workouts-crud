import {useContext, useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { AuthContext } from '../context/AuthContext'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

function Home() {
  const {workouts, dispatch} = useWorkoutsContext()
  const {state} = useContext(AuthContext)

  // Fetch data
  useEffect(() => {
    const fetchWorkouts = async ()=>{
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          "Authorization": `Bearer ${state.token}`
        }
      })
      const data = await response.json()
      
      if(response.ok){
        dispatch({type: "SET_ALL_WORKOUTS", payload: data})
      }
    }

    // Fetch data only if user is logged in
    if(state.token) {
      fetchWorkouts()
    }
  }, [dispatch, state.token])
  
  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout)=>(
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <div>
        <WorkoutForm />
      </div>
    </div>
  )
}

export default Home