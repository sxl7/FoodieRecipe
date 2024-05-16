import React from "react";
import { useState } from "react";

function Register({ onLoginClick,handleRegisterCancel}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordMatch(true)
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return; // Prevent form submission if passwords don't match
    }
    // Continue with registration logic here
    console.log("Registration submitted");
  };

  return (
    <div className="login-modal">
      <div className="modal-contents">
      <p style={{ marginBottom: "20px", fontSize: "22px"}}>Register</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{marginLeft:'-70%'}}>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              autoComplete="off"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" style={{marginLeft:'-70%'}}>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              autoComplete="off"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{marginLeft:'-70%'}}>Password</label>
            <input
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {!passwordMatch && (<p className="error-message">password not match</p>)}
          </div>

          <div className="form-group">
            <label className="form-label" style={{marginLeft:'-45%'}}>Re-enter Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordMatch && (<p className="error-message">password not match</p>)}
          </div>

          <button type="submit" className="button" >
            Submit
          </button>
          <button className="button" onClick={handleRegisterCancel}>
            Cancel
          </button>
          <div>
            <p style={{ marginTop: "10px" }}>
              Have an account?{" "}
              <span className="register-link" onClick={onLoginClick}>
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
