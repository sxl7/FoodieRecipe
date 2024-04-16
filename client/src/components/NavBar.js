import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../style/NavBar.css';

function NavBar() {
  const [viewLogin, setViewLogin] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);
  // Function to handle login button click
  const handleLoginClick = () => {
    setViewLogin(true);
  };

  // Function to handle canceling login
  const handleLoginCancel = () => {
    setViewLogin(false);
  };
  // Function to handle register button click
  const handleRegisterClick = () => {
    setViewRegister(true);
  };

  // Function to handle canceling register
  const handleRegisterCancel = () => {
    setViewRegister(false);
  };

  return (
    <nav>
      <ul>
        <span className='Navbar'><a href="#">Home</a></span>
        <span className='Navbar'><a href="#">Breakfast</a></span>
        <span className='Navbar'><a href="#">Lunch</a></span>
        <span className='Navbar'><a href="#">Dinner</a></span>
        <span className='Navbar'><a href="#">Dessert</a></span>
        <span className='Navbar'><a href onClick={handleLoginClick}>Log In</a></span>
        {/* Separate modal for login */}
        {viewLogin && (
          <div className="loginModal">
            <div className="modalContent">
              <Login onCancel={handleLoginCancel} />
            </div>
          </div>
        )}
        <span className='Navbar' ><a href onClick={handleRegisterClick}>Sign Up</a></span>
        {viewRegister && (
          <div className="loginModal">
            <div className="modalContent">
              <Register onCancel={handleRegisterCancel} />
            </div>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
