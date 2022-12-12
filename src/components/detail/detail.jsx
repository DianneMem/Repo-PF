import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getBooksDetails } from '../../redux/actions';
import defaultImage from '../../assets/bookDefault.png';
import './detail.css';
import favs from '../../assets/favs.png'
import cart from '../../assets/cart.png';
import ebook from '../../assets/ebook.png';
import physical from '../../assets/physical.png';
import Header from '../header/Header';

export default function Detail() {

  let detail = useSelector(state => state.detailsBook);
  let { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooksDetails(id));
  }, [dispatch, id]);

  return (
    <div className='contain'>
<Header/>
      <div class='top'><div>
        <a href="#">
        <img className='icon'src={favs} alt="" />
        </a>
        <a href="#">
        <img className='icon' src={cart} alt="" />
      </a>
        </div></div>
      <div class='details'>
        <div class='left'>
          <img src={detail.image ? (detail.image) : (defaultImage)} alt='Book' className='image' />
        </div>
        <div class='right'>
          <h1 >{detail.title}</h1>

          <p class=''>Author: {detail.author}</p>
          <p class=''>Category: {detail.categorie}</p>
          <p class=''>Editorial: {detail.editorial}</p>
          {detail.saga && <p class=''>Saga: {detail.saga}</p>}
          <p>Lenguage: {detail.language}</p>
          <p>Gender: {detail.gender?.map((e) => { return (<span>{e}</span>) })}</p>
          <p >Year: {detail.year}</p>
          <p>State: {detail.state}</p>
          <p>Available: {detail.available}</p>
        </div>
      </div>
      <div class='comprar'>
        <div class='comprar-left'>{detail.typebook && detail.typebook == 'ebook' ?
          <>
            <img src={ebook} /><p>ebook</p></> : <><img src={physical} /><p>Physical book</p></>}
        </div>
        <div class='comprar-right'>
          <h3 >{detail.price}</h3>
          
          <a className='button'>Buy</a></div>
      </div>


    </div>
  )
};
