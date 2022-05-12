import React from "react"
import logo from "../images/keys.png"

export default function NavbarMain() {
    return(
        <nav className="navbar-main">
            <img src={logo} alt="KeepItSafe" />
            <h1>KeepItSafe</h1>
            <h3>Log Out</h3>
        </nav>
    );
};