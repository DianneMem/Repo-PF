import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import defaultImage from '../../assets/bookDefault.png';
import s from './card.module.css';
import { useDispatch } from 'react-redux';
import { addFavorites } from '../../redux/actions';

export default function Card({id, title, image, type, price, author}){

  // Only First Mayus
  let titlemod = title.toLowerCase().split(' ').join(' ');
  let mayus = title[0].toUpperCase();
  titlemod = mayus + titlemod.slice(1,titlemod.length);
  title = titlemod;
  let detail={_id:id,title:title,image:image,author:author,price:price}
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal)
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

  function favsHandler(e,message){
    e.preventDefault();
    if(!localStorage.getItem("favs")){
      localStorage.setItem("favs","[]")
    }
    let favs = JSON.parse(localStorage.getItem("favs"));
    let userId = JSON.parse(localStorage.getItem("session"));
    if(userId){
      let id=userId[0].id
    if(favs.filter(e=>e._id===detail._id).length<1){
      favs.push(detail)
      localStorage.setItem("favs", JSON.stringify(favs))
dispatch(addFavorites(id,detail))}
else{
  MySwal.fire('You already have this product in the cart!', message, 'error')
}
    
  }else{
    if(!localStorage.getItem("favs")){
      localStorage.setItem("favs","[]")
     
    }

    MySwal.fire('Please register to be able to add products to Favorites!', message, 'info')
    navigate("/login");
  }


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
        <button className={s.favorite} onClick={(e) => favsHandler(e)}>    
          <FiHeart />
        </button>
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

