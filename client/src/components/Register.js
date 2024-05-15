import React from 'react'

function Register({onLoginClick}){
    return (
        <div className="login-modal">
          <p style={{marginBottom: '50px', fontSize: '22px'}}>Register</p>
          <div className="modal-content">
            <form>
            <div className="form-group">
                <label className="form-label">Your Name</label>
                <input type="name" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>
    
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" placeholder="Enter your password" />
              </div>
    
              <div className="form-group">
                <label className="form-label">Re-enter Password</label>
                <input type="password" placeholder="Confirm your password" />
              </div>

              <button type='submit' className='button'>
                Submit
              </button>
              <button type='cancel' className='button'>
                Cancel
              </button>
              <div>
               <p style={{marginTop: '10px'}}>Have an account? <span className='register-link' onClick={onLoginClick}>Login</span></p>
             </div>
            </form>
          </div>
        </div>
      );
    
}
export default Register