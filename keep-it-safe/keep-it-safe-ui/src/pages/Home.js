import React from 'react';
import { useState } from 'react';
import LoginForm from "../components/LoginForm";
import LoggedIn from '../components/LoggedIn';

function Home() {

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
    <body>
      <div className="login-page">
      {(user.username !== "") ? (
      <div className="welcome">
        <LoggedIn />
        <div class= "logout">
        <button onClick={Logout}>logout</button>
        </div>
      </div>
      ) : (
        <div className='application'>
      <LoginForm Login={Login} error={error} />
      </div>
      )}
      </div>
    </body>
  );
};


export default Home;
