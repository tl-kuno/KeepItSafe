import React from 'react';

function Navigation() {



  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">KeepItSafe</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <a className="nav-link" href="/add-new">Generate Password</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/view-all">View Saved</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;

