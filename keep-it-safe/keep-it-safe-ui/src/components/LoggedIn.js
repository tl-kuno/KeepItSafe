import React from "react";
import { Link } from 'react-router-dom';

function LoggedIn() {

    return (
        <div class="block-container" >
            <div className="block-container-inner">
                <h1>Welcome to KeepItSafe</h1>
                <h2>What would you like to do?</h2>
                <div className="logged-in-nav">
                    <Link to="/add-new">Add New</Link>
                    <Link to="/view-all">View All</Link>
                </div>
            </div>
        </div>
    );
};

export default LoggedIn;