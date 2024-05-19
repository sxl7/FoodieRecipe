import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header mt-3'>
        <Link to='/home' style={{ textDecoration: 'none', color: 'black'}}><h1>Foodie Recipe</h1></Link>
        <NavBar/>
    </header>

  )
}

export default Header