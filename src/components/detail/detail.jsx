import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { getBooksDetails } from '../../redux/actions';
import defaultImage from '../../assets/bookDefault.png';
import s from './detail.module.css';

export default function Detail(props){

let detail = useSelector(state => state.detailsBook);
let {id} = useParams();

const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getBooksDetails(id));
},[dispatch, id]);

return(
<div className={s.container}>
  <div className={containerImage}>
  <img src={detail.image? (detail.image) : (defaultImage)} alt='Book' className={s.image}/>
  
  <h1 className={s.name}>{detail.title}</h1>

  <p>Author:{detail.author ? detail.author : detail.Products.map((e)=>e.author)}</p>
  <p>Categoty:{detail.categorie ? detail.categorie : detail.Categorie?.map((e)=>e.name)}</p>
  <p>Editorial:{detail.editorial ? detail.editorial : detail.Products.map((e)=>e.editorial)}</p>
  <p>Saga:{detail.saga ? detail.saga : detail.Products?.map((e)=>e.saga)}</p>
  <p>Lenguage{detail.language ? detail.language : detail.Language?.map((e)=>e.name)}</p>
  <p>Gender: {detail.gender? detail.gender : detail.Gender?.map((e)=>e.name)}</p>
  <p>Year: {detail.year? detail.year : detail.Products?.map((e)=>e.year)}</p>
  <p>Available: {detail.available? detail.available : detail.Products?.map((e)=>detail.available)}</p>
  <button onClick={"Comprar"}></button>

  <h3>{detail.price}</h3>

  </div>
  </div>
</div>
)};
