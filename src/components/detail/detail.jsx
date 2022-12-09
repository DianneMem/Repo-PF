import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { getBooksDetails } from '../../redux/actions';
import defaultImage from '../../assets/bookDefault.png';
import s from './detail.module.css';

export default function Detail(){

let detail = useSelector(state => state.detailsBook);
let {id} = useParams();

const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getBooksDetails(id));
},[dispatch, id]);

return(
<div className={s.container}>
  <div className={s.containerImage}>
  <img src={detail.image? (detail.image) : (defaultImage)} alt='Book' className={s.image}/>
  
  <h1 className={s.name}>{detail.title}</h1>

  <p>Author:{detail.author}</p>
  <p>Categoty:{detail.categorie}</p>
  <p>Editorial:{detail.editorial}</p>
  <p>Saga:{detail.saga}</p>
  <p>Lenguage{detail.language}</p>
  <p>Gender: {detail.gender?.map((e)=>{return(<span>{e}</span>)})}</p>
  <p>Year: {detail.year}</p>
  <button>Buy</button>

  <h3>{detail.price}</h3>

  </div>
</div>
)};
