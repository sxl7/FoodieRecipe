import React from "react";
import "../style/Login.css";
import { useState, useEffect } from "react";
import axios from "axios";
import  useAuth  from "../utils/useAuth";
import { useToast } from "../utils/ToastSetUp";


function Login({ onRegisterClick, handleLoginCancel }) {

  const {setAuth} =useAuth()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [valiPwd, setValiPwd] = useState(true);

  const{notifySuccess,notifyError} = useToast()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 7) {
      setValiPwd(false);
      return;
    }
    userLogin();
  };

  const userLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const user = response?.data
      console.log(user)

      setPassword("")
      setEmail("")
      handleLoginCancel()
      setAuth(user)
      notifySuccess(`Welcom Back! ${user?.userName}`);
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        notifyError(error?.response?.data?.message);
      } else {
        notifyError("Oops! Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    setValiPwd(true);
    setErrMsg("");
  }, [password]);

  return (
    <div className="login-modal">
      <div className="modal-content">
        <p style={{ marginBottom: "20px", fontSize: "24px" }}>Login</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
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
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {!valiPwd && (
              <p className="error-message">Password at least 7 characters </p>
            )}
            {errMsg && <p className="error-message">{errMsg} </p>}
          </div>

          <button type="submit" className="button">
            Submit
          </button>
          <button type="cancel" className="button" onClick={handleLoginCancel}>
            Cancel
          </button>
          <div>
            <p style={{ marginTop: "10px" }}>
              Don't have an account?{" "}
              <span className="register-link" onClick={onRegisterClick}>
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
