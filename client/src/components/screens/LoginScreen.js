import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./LoginScreen.css";

const LoginScreen = ({history}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  },[history])

  const loginHandler = async (e) => {
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }

    

    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email, password
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
      
  <div className="login-screen">
    <form onSubmit={loginHandler} className="login-screen">
      <h3 className="login-screen_title">
        Login To Your Account
        </h3>
        {error && <span className="error-message">{error}</span>}
        
        <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" required id="email" placeholder="Enter your email" value="{email}" onChange={(e)=>setEmail(e.target.value)} />
        </div>
        
        <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input type="password" required id="password" placeholder="Enter a password" value="{password}" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        
        
        <button type="submit" className="btn btn-primary">Login</button>

        <span className="login-screen_subtext" >Have No Account?<Link to="/register">Register Account</Link></span>
    </form>
  </div>
    )



}

export default LoginScreen;
