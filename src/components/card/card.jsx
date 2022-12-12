import React from 'react';
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import defaultImage from '../../assets/bookDefault.png';
import s from './card.module.css';

export default function Card({id, title, image, type, price, author}){

  // Only First Mayus
  let titlemod = title.toLowerCase().split(' ').join(' ');
  let mayus = title[0].toUpperCase();
  titlemod = mayus + titlemod.slice(1,titlemod.length);
  title = titlemod;
  
  // Max title characters
  const maxLength1 = 41;
  // if card is more smaller, maxLength1 = 34;
  if(title.length > maxLength1){
  title = title.slice(0,maxLength1) + '...'
  };
  
  // Max author words
  const maxLength2 = 22;
  if(author.length > maxLength2){
    author = author.split(' ').slice(0,2).join(' ');
  }


return(
  id === 'NO LINK' ?
  (<div key={id} className={s.cardStatic}>
    <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
    <h5>{title}</h5>
    <p>{author}</p>
    <span>{type}</span>
    <span>$ {price}</span>
  </div>)
  : 
  (<Link to={`/detail/${id}`} className={s.decOff}>
    <div key={id} className={s.card}>
      <div className={s.containerImage}>
        <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
        <div className={s.aux}>
       {/*  <button className={s.favorite}>
          <FiHeart />
        </button> */}
        </div>
      </div>
        
      <div className={s.data}>
        <div className={s.containerTitle}>
          <p>{title}</p>
        </div>
        <p>{author}</p>
      </div>
      
      <div className={s.foot}>
        <span>{type}</span>
        <span>$ {price}</span>
      </div>
    </div>
  </Link>)
)};

