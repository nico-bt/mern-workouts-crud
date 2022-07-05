import {useEffect, useState} from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

function Home() {
  const [workouts, setWorkouts] = useState(null)

  // Fetch data
  useEffect(() => {
    const fetchWorkouts = async ()=>{
      const response = await fetch("http://localhost:4000/api/workouts")
      const data = await response.json()
      
      if(response.ok){
        setWorkouts(data)
      }
    }
    fetchWorkouts()
  }, [])
  
  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout)=>(
          <WorkoutDetails key={workout._id} workout={workout} setWorkouts={setWorkouts}/>
        ))}
      </div>
      <div>
        <WorkoutForm setWorkouts={setWorkouts} />
      </div>
    </div>
  )
}

export default Home