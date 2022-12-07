import React from 'react'
import s from './Header.module.css';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <head className={s.Header}>
        <h1>eBooks</h1>
        <ul>
            <Link to='/login'><li>Login</li></Link>
            <Link to='/createproduct'></Link>
        </ul>
    
    </head>
  )
}
