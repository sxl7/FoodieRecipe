import React, { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../style/NavBar.css";
import { Link } from "react-router-dom";
import useAuth from "../utils/useAuth";


function NavBar() {
  const [viewLogin, setViewLogin] = useState(false);
  const [viewRegister, setViewRegister] = useState(false);
  const [signOut,setSignOut] = useState(false)

  const {auth,setAuth} = useAuth()

  useEffect(()=>{
    if(auth?.id){
      setSignOut(true)
    }
  },[viewLogin,auth?.id])


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

  const handleSignOut = ()=>{
    setAuth({})
    setSignOut(false)
  }

  return (
    <>
      <nav>
        <ul>
          <Link to="/home" className="Navbar">
            Home
          </Link>
          <Link to="/breakfast" className="Navbar">
            Breakfast
          </Link>
          <Link to="/maincourse" className="Navbar">
            Main Course
          </Link>
          <Link to="/salad" className="Navbar">
            Salad
          </Link>
          <Link to="/search" className="Navbar">
            Search
          </Link>
          <Link to="/favorite" className="Navbar">
            Favorite
          </Link>
          {!signOut?(<span className="button-like" onClick={handleLoginClick}>
            Log In
          </span>):(
            <span className="button-like" onClick={handleSignOut}>Sign Out</span>
          )
          
        }
        </ul>
      </nav>

      {/* Separate modal for login */}
      {viewLogin && (
        <div className="loginModal">
          <div className="modalContent">
            <Login
              handleLoginCancel={handleLoginCancel}
              onRegisterClick={handleRegisterClick}
            />
          </div>
        </div>
      )}

      {viewRegister && (
        <div className="loginModal">
          <div className="modalContent">
            <Register
              handleRegisterCancel={handleRegisterCancel}
              onLoginClick={handleLoginClick}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
