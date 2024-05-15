import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../style/NavBar.css';
import { BrowserRouter as Router} from 'react-router-dom';
function NavBar() {
  const [viewLogin, setViewLogin] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);
  // Function to handle login button click
  const handleLoginClick = (event) => {
    setViewLogin(true);
    setViewRegister(false);
  };

  // Function to handle canceling login
  const handleLoginCancel = () => {
    setViewLogin(false);
  };
  // Function to handle register button click
  const handleRegisterClick = (event) => {
    setViewRegister(true);
    setViewLogin(false);
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
        <span className='Navbar'><a href="maincourse">Main Course</a></span>
        <span className='Navbar'><a href="salad">Salad</a></span>
        <span className='Navbar'><a href="dessert">Dessert</a></span>
        <span className='Navbar'><a href="favorite">Favorite</a></span>
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
    
        {viewRegister && (
          <div className="loginModal">
            <div className="modalContent">
              <Register onCancel={handleRegisterCancel} 
              onLoginClick={handleLoginClick}/>
            </div>
          </div>
        )}
    </Router>
  );
}

export default NavBar;
