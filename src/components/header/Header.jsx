import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from "../searchBar/SearchBar";
import s from './Header.module.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Header() {
  return (
    </header>
    
    
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">flybooks</Navbar.Brand>
        <SearchBar/>
          <Nav className="me-auto">
            <Nav.Link href="/createProduct">Login</Nav.Link>
            <Nav.Link href="/products">Register</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    
  
  {/* 
    <Navbar bg="dark" expand="lg" className='navbar-dark'>
      <Container>
        <Navbar.Brand href="/">flybooks</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <SearchBar/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href="/">Register</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   */}
  
  </React.Fragment>
  )
};





