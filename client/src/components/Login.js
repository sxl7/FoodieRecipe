import React from 'react'
import '../style/Login.css'


function Login({ onRegisterClick }){
    return (
        <div className="login-modal">
          <p style={{marginBottom: '50px', fontSize: '24px'}}>Login</p>
          <div className="modal-content">
            <form>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>
    
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" placeholder="Enter your password" />
              </div>
    
              <button type='submit' className='button'>
                Submit
              </button>
              <button type='cancel' className='button'>
                Cancel
              </button>
              <div>
                <p style={{marginTop: '10px'}}>Don't Have an account? <span className='register-link' onClick={onRegisterClick}>Register</span></p>
              </div>
            </form>
          </div>
        </div>
      );

}
export default Login