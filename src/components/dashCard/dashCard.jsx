import React from 'react';
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

import defaultImage from '../../assets/bookDefault.png';
import s from './dashCard.module.css';

export default function DashCard({id, title, image, typebook, price, author, categorie, editorial, saga, language, gender, year, state, available, deletes, disable }){

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


return(<>

    <div key={id} className={s.card}>
      <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
      <div className={s.info}>
        <p className={s.title}>{title}</p>
        <div>
          <p>Category: {categorie}</p>
          <span>Genders:</span>
          <span>{gender?.join(', ')}</span>
        </div>
        <div className={s.infoContainer}>
          <p>Author: {author}</p>
          <p>|</p>
          <p>Editorial: {editorial}</p>
          <p>|</p>
          <p>Language: {language}</p>
          <p>|</p>
          <p>Year: {year}</p>
          <p>|</p>
          <p>State: {state}</p>
          <p>|</p>
          <p>Type: {typebook}</p>
          <p>|</p>
          {available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
          <p>|</p>
          <p>${price}</p>
        </div>
        <div className={s.infoContainer}>
          {available? (<button value={id} onClick={e => disable(e)} className="btn btn-outline-warning">Disable</button>) : 
          (<button value={id} onClick={e => disable(e)} className="btn btn-outline-warning">Enable</button>)}
          <button value={id} onClick={e => deletes(e)} className="btn btn-outline-danger">Delete</button>
        </div>
      </div>
    </div>
    
  </>
)};

