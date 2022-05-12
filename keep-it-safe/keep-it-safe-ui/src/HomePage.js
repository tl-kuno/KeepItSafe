import React from "react";
import NavbarMain from './components/NavbarMain';
import Login from "./components/Login";

export default function HomePage() {
    return(
        <main className="HomePage">
            <header className="App-header">
                <NavbarMain />
            </header>
            <div className="main-content">
                <Login />
            </div>
      </main>
    );
};