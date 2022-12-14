import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import Loader from '../loader/Loader';
import Stripe from '../stripe/Stripe';

export default function Cart() {
  let getCart=JSON.parse(localStorage.getItem("cart"))
// function deleteAllLocalStorage(e){

// }
  console.log(localStorage);
  return (
    <div >
      {/* <button onClick={e=>deleteAllLocalStorage(e)}>Delete All Cart Products</button> */}
{getCart.map(e=> <div><img src={e.image} alt="imgcart" />
<h1>{e.title}</h1>
<h1>{e.price}</h1>
<h1>{e.author}</h1>
<h1>{e.state}</h1>
<h1>{e.Editorial}</h1></div>
)}
    </div>
  )
};
