import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from "../searchBar/SearchBar";
import favIcon from "../../assets/favs.png";
import buyIcon from "../../assets/buy.png"
import s from './Header.module.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Header({noSearch=false}) {
  return (
    <React.Fragment>
  
    {noSearch ? 
    (<header className={s.header}>
      <div>
        <h2>flybooks</h2>
        <p>Fast Travel documents</p>
      </div>
 
      <div className={s.container}>
        <button className={s.link}>Favorites</button>
        <button className={s.link}>shopping</button>
      </div>
      <div className={s.container}>
        <Link to="/login"><button className={s.link}>Login</button></Link>
        <Link to='/createProduct'><button className={s.link}>Register</button></Link>
      </div>
    </header>)
    : 
    (<header className={s.header}>
      <div>
        <h2>flybooks</h2>
        <p>Fast Travel documents</p>
      </div>
      <SearchBar/>
      <div className={s.container}>
        <button className={s.link}>Favorites</button>
        <button className={s.link}>shopping</button>
      </div>
      <div className={s.container}>
        <Link to="/login"><button className={s.link}>Login</button></Link>
        <Link to='/createProduct'><button className={s.link}>Register</button></Link>
      </div>
    </header>)}
    
    {/*   
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">flybooks</Navbar.Brand>
        <SearchBar/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/createProduct">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    */}
    
  
    {/* 
    <Navbar bg="dark" expand="lg" className='navbar-dark'>
      <Container>
        <Navbar.Brand href="/">flybooks</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <SearchBar/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/createProduct">Register</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   */}
  
  </React.Fragment>
  )
};





