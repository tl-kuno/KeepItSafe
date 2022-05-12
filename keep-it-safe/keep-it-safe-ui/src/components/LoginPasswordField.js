import React from "react";
import profile from "../images/lock.png"

export default function LoginUserField(){
    return(
        <div className="login--field">
            <img className="login--logo" src = {profile} alt="login" /><input 
                type="text" className="login--input" placeholder="password"/>
        </div>
    );
};