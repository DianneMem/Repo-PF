import React from 'react'
import s from './Header.module.css';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header className={s.Header}>
        <h1>eBooks Home</h1>
        <Link to='/login'><p>Login</p></Link>
        <Link to='/createproduct'><p>Create</p></Link>
    </header>
  )
};
