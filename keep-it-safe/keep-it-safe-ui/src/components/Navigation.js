import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../images/keys.png';


function Navigation() {
  return (
    <Navbar class="navbar navbar-default navbar-fixed-top" bg="dark" variant="dark" sticky="top">
    <Container>
    <Navbar.Brand>
        <img className="navbar-logo" src={logo} alt="logo"/>
      KeepItSafe</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/add-new">Add New</Nav.Link>
      <Nav.Link href="/view-all">View All</Nav.Link>
    </Nav>
    <Nav className="justify-content-end">
      <Nav.Link href="/">Logout</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  )
}

export default Navigation
