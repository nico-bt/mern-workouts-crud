import {useEffect} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import useWorkoutsContext from '../hooks/useWorkoutsContext'

function Home() {
  const {workouts, dispatch} = useWorkoutsContext()

  // Fetch data
  useEffect(() => {
    const fetchWorkouts = async ()=>{
      const response = await fetch("http://localhost:4000/api/workouts")
      const data = await response.json()
      
      if(response.ok){
        // dispatch(action) --> action is the object that the reducer will take
        dispatch({type: "SET_ALL_WORKOUTS", payload: data})
      }
    }
    fetchWorkouts()
  }, [dispatch])
  
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