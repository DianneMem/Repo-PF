import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {getAllBooks} from '../../redux/actions';
import Card from "../card/card";

import s from "./home.module.css";


export default function Home(){



const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getAllBooks());
    },[dispatch, getAllBooks]);
    
    
let allbooks = useSelector(state => state.allbooks);
allbooks = allbooks.map(b=>{return({...b, id: b._id}) })
console.log(allbooks)

return(
<>
<h1>HOME</h1>
<div className={s.cards}>
{allbooks.map(b=>{return(
  <Card key={b._id} id={b._id} title={b.title} image={b.image} typebook={b.typebook} price={b.price}/>
)})}
</div>
</>
)};
