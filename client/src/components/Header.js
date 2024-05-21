import React from 'react'
import NavBar from './NavBar'
import "../style/NavBar.css";
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <Link to='/home' style={{ textDecoration: 'none', color: 'black',padding:"50px"}}><h1>Foodie Recipe</h1></Link>
        <NavBar/>
    </header>

  )
}

export default Header