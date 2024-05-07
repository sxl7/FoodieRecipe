import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../style/NavBar.css';
import { BrowserRouter as Router} from 'react-router-dom';
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
    <Router>
    <nav>
      <ul>
        <span className='Navbar'><a href="home">Home</a></span>
        <span className='Navbar'><a href="breakfast">Breakfast</a></span>
        <span className='Navbar'><a href="lunch">Lunch</a></span>
        <span className='Navbar'><a href="dinner">Dinner</a></span>
        <span className='Navbar'><a href="dessert">Dessert</a></span>
        <span className='Navbar'><a href onClick={handleLoginClick}>Log In</a></span>
        </ul>
    </nav>

        {/* Separate modal for login */}
        {viewLogin && (
          <div className="loginModal">
            <div className="modalContent">
              <Login onCancel={handleLoginCancel} onRegisterClick={handleRegisterClick}/>
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
    </Router>
  );
}

export default NavBar;
