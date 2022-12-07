import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { getBooksDetails } from '../../redux/actions';
import defaultImage from '../../assets/bookDefault.png';
import s from './detail.module.css';

export default function Detail(){

let detail = useSelector(state => state.detailsBook);
let {id} = useParams();

console.log(id);

const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getBooksDetails(id));
},[dispatch, id]);

return(
<div>
  <img src={detail.image? (detail.image) : (defaultImage)} alt='Book' className={s.image}/>
  <h4>{detail.title}</h4>
  <p>{detail.typebook}</p>
  <p>{detail.price}</p>
</div>
)};
