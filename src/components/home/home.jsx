import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from 'react-icons/fi';
import { Link } from "react-router-dom";


import {getAllBooks} from '../../redux/actions';
import Card from "../card/card";

import s from "./home.module.css";


export default function Home(){



const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getAllBooks());
    },[dispatch]
);
    
    
let allbooks = useSelector(state => state.allbooks);
console.log(allbooks)

return(
<>
<h1>HOME</h1>
<Link to={`/createproduct`} className={s.det}>Create</Link>
<div className={s.cards}>
{allbooks.map(b=>{return(
<div key={b._id} className={s.card}>
  <button className={s.favorite}><FiHeart/></button>
  <Card id={b._id} title={b.title} image={b.image} typebook={b.typebook} price={b.price} author={b.author} type={b.typebook}/>
</div>
)})}
</div>

</>
)};
