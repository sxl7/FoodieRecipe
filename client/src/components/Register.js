import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../utils/ToastSetUp";

const NAME_REGEX = /^[A-z][A-z0-9-_]{2,23}$/;

function Register({ onLoginClick, handleRegisterCancel }) {
  const [firstName, setFirstName] = useState("");
  const [validFname, setValidFname] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLname, setValidLname] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const{notifySuccess,notifyError} = useToast()


  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordMatch(true);

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    if (!validFname || !validLname) {
      return;
    }
    handleRegister();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setPasswordMatch(true);
  }, [password, confirmPassword]);

  useEffect(() => {
    setValidFname(NAME_REGEX.test(firstName));
  }, [firstName]);

  useEffect(() => {
    setValidLname(NAME_REGEX.test(lastName));
  }, [lastName]);

  const handleRegister = async () => {
    await axios
      .post(`https://foodie-recipe.vercel.app/api/register`, {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        /* console.log(res); */
        notifySuccess(res?.data?.message);
        onLoginClick();
      })
      .catch((res) => {
        /* console.log(res); */
        notifyError(`${res?.response?.data}\n`);
      });
  };

  return (
    <div className="login-modal">
      <div className="modal-contents">
        <p style={{ marginBottom: "20px", fontSize: "22px" }}>Register</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ marginLeft: "-70%" }}>
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              autoComplete="off"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            {!validFname && (
              <p className="error-message">
                Invalid First Name{" (Length > 2)"}
              </p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" style={{ marginLeft: "-70%" }}>
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              autoComplete="off"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            {!validLname && (
              <p className="error-message">
                Invalid Last Name{" (Length > 2)"}
              </p>
            )}
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
            <label className="form-label" style={{ marginLeft: "-70%" }}>
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="off"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {!passwordMatch && (
              <p className="error-message">password not match</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ marginLeft: "-45%" }}>
              Re-enter Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="off"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordMatch && (
              <p className="error-message">password not match</p>
            )}
          </div>

          <button type="submit" className="button">
            Submit
          </button>
          <button className="button" onClick={handleRegisterCancel}>
            Cancel
          </button>
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "🔒"}
          </span>
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
