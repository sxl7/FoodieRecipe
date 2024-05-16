import React from 'react'
import '../style/Login.css'
import { useState } from "react";

function Login({ onRegisterClick, handleLoginCancel }){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    return (
        <div className="login-modal">
          <div className="modal-content">
          <p style={{marginBottom: '20px', fontSize: '24px'}}>Login</p>
            <form>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                type="email" 
                placeholder="Enter your email" 
                autoComplete="off"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}/>
              </div>
    
              <div className="form-group">
                <label className="form-label" style={{marginLeft:'-70%'}}>Password</label>
                <input 
                type="password" 
                placeholder="Enter your password" 
                autoComplete="off"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
    
              <button type='submit' className='button'>
                Submit
              </button>
              <button type='cancel' className='button' onClick ={handleLoginCancel}>
                Cancel
              </button>
              <div>
                <p style={{marginTop: '10px'}}>Don't have an account? <span className='register-link' onClick={onRegisterClick}>Register</span></p>
              </div>
            </form>
          </div>
        </div>
      );

}
export default Login