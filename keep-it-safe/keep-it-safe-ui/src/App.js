import './App.css';
import React from 'react';
import LoginForm from './components/LoginForm';
import { useState } from 'react';



function App() {

  const credentials = {
    username: "kunot",
    password: "password"
  };
  
  const [user, setUser] = useState({username:"", password:""});
  const [error, setError] = useState(""); 
  
  const Login = details => {
    console.log(details);
    if (details.username === credentials.username && details.password === credentials.password){
      console.log("Logged in")
      setUser({
        username:details.username,
        password:details.password
      });
    } else {
      console.log("Incorrect username or password");
      setError("Incorrect username or password")
    }

  }
  const Logout = () => {
    console.log("Logout");
    setUser({
      username:"",
      password:""    
    })
  };

  return (
    <div className="login-page">
      {(user.username !== "") ? (
        <div className="welcome">
          <h2 className="greeting">Welcome, <span>{credentials.username}</span></h2>
          <button onClick={Logout}>Logout</button>
      </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
};

export default App;
