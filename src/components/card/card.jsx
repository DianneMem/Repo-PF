import React from 'react';
import { Link } from "react-router-dom";

import defaultImage from '../../assets/bookDefault.png';
import s from './card.module.css';

export default function Card({id, title, image, type, price, author}){




return(
  id === 'NO LINK' ?
  (<div key={id} className={s.cardStatic}>
    <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
    <h4>{title}</h4>
    <p>{author}</p>
    <span>{type}</span>
    <span>$ {price}</span>
  </div>)
  : 
  (<Link to={`/detail/${id}`} className={s.det}>
    <div key={id} className={s.card}>
      <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
      <div className={s.data}>
        <h4>{title}</h4>
        <p>{author}</p>
      </div>
      <div className={s.foot}>
        <span>{type}</span>
        <span>$ {price}</span>
      </div>
    </div>
  </Link>)
)};
