import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
        <div className='container'>
            <Link to="/"><h1>Home</h1></Link>
            <Link to="/page1"><h1>Page One</h1></Link>
        </div>
    </header>
  )
}

export default Navbar