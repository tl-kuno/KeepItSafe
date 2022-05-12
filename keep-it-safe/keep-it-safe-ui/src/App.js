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

  }
  const Logout = () => {
    console.log("Logout");
  };

  return (
    <div className="login-page">
      {(user.username !== "") ? (
        <div className="welcome">
          <h2 className="greeting">Welcome, <span>{user.login}</span></h2>
          <button>Logout</button>
      </div>
      ) : (
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
};

export default App;
