import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { WorkoutsContext } from '../context/WorkoutContext'

function Navbar() {

  const {state, dispatch} = useContext(AuthContext)
  const {dispatch: workoutsContext_Dispatch} = useContext(WorkoutsContext)

  const handleClick = () => {
    dispatch({type: "LOGOUT"})
    workoutsContext_Dispatch({type:"SET_ALL_WORKOUTS", payload: null })
  }

  return (
    <header>
      <div className='container'>
          { state.email && <h2>Welcome {state.email}</h2>}
          { state.email && <h1 onClick={handleClick} className="logout">Log out</h1>}

          { !state.email && <Link to="/login"><h1>Log in</h1></Link> }
          { !state.email && <Link to="/signup"><h1>Sign up</h1></Link> }
      </div>
    </header>
  )
}

export default Navbar