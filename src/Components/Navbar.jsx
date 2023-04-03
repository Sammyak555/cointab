import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
        <div>
        <Link to='/'>Login Page</Link>
        </div>
        <div>
        <Link to='/home'>Home Page</Link>
        </div>
    </div>
  )
}

export default Navbar