import React, { useReducer, useEffect } from 'react'
import { createContext } from "react";

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            const {email, token} = action.payload
            return { email, token }
            
        case "LOGOUT":
            localStorage.removeItem("user")
            return { email: null, token: null }
            
        default:
            return state
    }
}

export function AuthContextProvider({children}) {

    const [state, dispatch] = useReducer(authReducer, {email: null, token: null})
    
    // Get user from local storage if exists, pass it to the Context to set state on first render
    useEffect(() => {
        let user = localStorage.getItem("user")
        if(user) {
            user = JSON.parse(user)
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])
  
    return (
    <AuthContext.Provider value={{state, dispatch}}>
        { children }
    </AuthContext.Provider>
  )
}