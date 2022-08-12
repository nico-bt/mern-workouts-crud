import React from 'react'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { dispatch } = useContext(AuthContext)
    const [error, setError] = useState(null)
    let navigate = useNavigate()

    const handleSubmit = async (e)=> {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:4000/api/user/login", {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {"Content-Type": "application/json"}
            })
            const json = await response.json()

            if(response.ok){
                // Save user to Local Storage
                localStorage.setItem("user", JSON.stringify(json))
                
                // Get email and Token from response and make them available as global states with AuthContext        
                dispatch({type:"LOGIN", payload: {email:json.email, token:json.token}})
                
                // Reset inputs and error msg
                setEmail("")
                setPassword("")
                setError(null)
                // Redirect to Home
                navigate("/", { replace: true });
            }
            if(!response.ok){
                setError(json.error)
            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className="create">
            <label htmlFor='email'>Email:</label>
            <input type={"email"} name="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <label htmlFor='password'>Password:</label>
            <input type={"password"} name="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

            <button>Log in</button>
        </form>

        { error && 
            <div className='error'>
                {error}
            </div>
        }
    </div>
  )
}

export default Login