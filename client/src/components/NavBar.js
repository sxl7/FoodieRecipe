import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

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
        <li><a href="#">Home</a></li>
        <li><a href="#">Breakfast</a></li>
        <li><a href="#">Lunch</a></li>
        <li><a href="#">Dinner</a></li>
        <li><a href="#">Dessert</a></li>
        <li><a href onClick={handleLoginClick}>Log In</a></li>
        {/* Separate modal for login */}
        {viewLogin && (
          <div className="loginModal">
            <div className="modalContent">
              <Login onCancel={handleLoginCancel} />
            </div>
          </div>
        )}
        <li><a href onClick={handleRegisterClick}>Sign Up</a></li>
        {viewRegister && (
          <div className="loginModal">
            <div className="modalContent">
              <Register onCancel={handleRegisterCancel} />
            </div>
          </div>
        )}
      </ul>
      <hr />
    </nav>
  );
}

export default NavBar;
