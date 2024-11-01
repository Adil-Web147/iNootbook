import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../adil.css';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    if(json.success){
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Logged in Successfully", "success");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className='login-background mt-5'>
      <div className="login-container mx-2">
        <h2 className='my-3'>Login to Continue the iNotebook</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={credentials.email} 
              onChange={onChange} 
              id="email" 
              aria-describedby="emailHelp" 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={credentials.password} 
              onChange={onChange} 
              id="password" 
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
