import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./RegisterScreen.css";

const RegisterScreen = ({history}) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("")
      }, 5000);
      return setError("Passwords do not match")
    }

    try {
      const { data } = await axios.post("/api/v1/auth/register", {
        username, email, password
      }, config);

      localStorage.setItem("authToken", data.token);

      history.push("/")
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    
    e.preventDefault();
  };


  return (
      
  <div className="register-screen">
    <form onSubmit={registerHandler} className="register-screen">
      <h3 className="register-screen_title">
        Register Account
      </h3>
      <div className="form-group">
        <label htmlFor="name">Username:</label>
        <input type="text" required id="name" placeholder="Enter a username" value="{username}" onChange={(e)=>setUsername(e.target.value)} />
        </div>
        
        <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" required id="email" placeholder="Enter your email" value="{email}" onChange={(e)=>setEmail(e.target.value)} />
        </div>
        
        <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" required id="password" placeholder="Enter a password" value="{password}" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        
        <div className="form-group">
        <label htmlFor="confirmpassword">Confirm Password:</label>
        <input type="password" required id="confirmpassword" placeholder="Confirm  password" value="{confirmPassword}" onChange={(e)=>setConfirmPassword(e.target.value)} />
        </div>
        
        <button type="submit" className="btn btn-primary">Register</button>

        <span className="register-screen_subtext" >Already Registered?<Link to="/login">Login</Link></span>
    </form>
  </div>
    )



}

export default RegisterScreen;
