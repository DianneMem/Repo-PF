import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBooks, disablePost, deletePost } from "../../redux/actions";
import DashCardForm from '../dashCardForm/dashCardForm';

import defaultImage from '../../assets/bookDefault.png';
import s from './dashCard.module.css';




export default function DashCard({id, title, image, typebook, price, author, categorie, editorial, saga, language, gender, year, state, available}){


  const dispatch = useDispatch();

  async function disable(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(disablePost(itemId));
    dispatch(getAllBooks());
  }
  
  async function deletes(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(deletePost(itemId));
    dispatch(getAllBooks());
  }



  // Only First Mayus
  let titlemod = title.toLowerCase().split(' ').join(' ');
  let mayus = title[0].toUpperCase();
  titlemod = mayus + titlemod.slice(1,titlemod.length);
  title = titlemod;
  
  // Max title characters
  const maxLength1 = 60;
  let titleShort = title;
  if(title.length > maxLength1){
  titleShort = title.slice(0,maxLength1) + '...'
  };
  // Max saga characters
  let sagaShort = saga || '';
  if(saga && saga.length > maxLength1){
  sagaShort = saga.slice(0,maxLength1) + '...'
  }
  // Max author words
  const maxLength2 = 22;
  let authorShort = author;
  if(author.length > maxLength2){
    authorShort = author.split(' ').slice(0,2).join(' ');
  }
  
  
  

  return(
  <React.Fragment>
    <div key={id} className={s.card}>
      <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
      <div>
        <div className={s.info}>
          <p className={s.title}>{titleShort}</p>
          <p className={s.title}>Saga: {saga? sagaShort : 'Unique'}</p>
          <div>
            <p>Category: {categorie}</p>
            <span>Genders:</span>
            <span>{gender?.join(', ')}</span>
          </div>
          <div className={s.infoContainer}>
            <p>Author: {authorShort}</p>
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
            <p>${price}</p>
            <p>|</p>
            {available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
          </div>
        </div>
        <div className={s.infoContainer}>
          {available? (<button value={id} onClick={e => disable(e)}>Disable</button>) : 
          (<button value={id} onClick={e => disable(e)} >Enable</button>)}
          <button value={id} onClick={e => deletes(e)}>Delete</button>
          <DashCardForm
          id={id}
          title={title}
          author={author}
          editorial={editorial}
          language={language}
          year={year}
          state={state}
          typebook={typebook}
          price={price}
          categorie={categorie}
          gender={gender}
          saga={saga}
          />
        </div>
      </div>
    </div>
    
    
  </React.Fragment>
  )
};
