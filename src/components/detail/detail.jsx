import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getBooksDetails } from '../../redux/actions';
import defaultImage from '../../assets/bookDefault.png';
import './detail.css';
import favs from '../../assets/favs.png'
import cart from '../../assets/cart.png';
import ebook from '../../assets/ebook.png';
import physical from '../../assets/physical.png';
import Header from '../header/Header';
import Loader from '../loader/Loader';
import Stripe from '../stripe/Stripe';

export default function Detail() {

  let detail = useSelector(state => state.detailsBook);
  let { _id } = useParams();
  const nagivate=useNavigate()
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getBooksDetails(_id));
  }, [dispatch, _id]);

  function backHandler(e){
    e.preventDefault()
    nagivate("/")
  }
  function paymentHandler(e){
    e.preventDefault()
    nagivate(`/payment/${_id}`)
  }

  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };
  if (!loading) {
    changeState();
    return <Loader />;
  }
  return (
    <div className='contain'>
<Header noSearch={true}/>
  
        
      <div class='details'>
      <button onClick={e=>backHandler(e)} className='buttonBack'>←</button>
        <div class='left'><div className='imgCard'>
          <img src={detail.image ? (detail.image) : (defaultImage)} alt='Book' className='image' />
        </div>
        </div>
        <div class='right'>
          <div className='cardDetail'>
            
             <h1 className='titleDetail'>{detail.title}</h1>
            <div className='labelDetail'>
         
          <p class=''>Author: <span className='detailSpan'>{detail.author}</span> </p>
          <p class=''>Category: <span  className='detailSpan'> {detail.categorie}</span></p>
          <p class=''>Editorial: <span  className='detailSpan'>{detail.editorial}</span> </p>
          {detail.saga && <p class=''>Saga: <span className='detailSpan'>{detail.saga}</span> </p>}
          <p>Lenguage: <span className='detailSpan'>{detail.language}</span></p>
          <p>Gender:  <span className='detailSpan'>{detail.gender?.map((e) => { return (<span>{e}</span>) })} </span> </p>
          <p >Year: <span className='detailSpan'>  {detail.year}</span> </p>
          <p>State: <span className='detailSpan'> {detail.state}</span> </p>
          <div class='top'><div>
        <a href="#">
        <img className='icon'src={favs} alt="" />
        </a>
        <a href="#">
        <img className='icon' src={cart} alt="" />
      </a>
        </div>
        </div>
          {/* <p>Available: {detail.available}</p> */}
          <div class='comprar'>
        <div class='comprar-left'>{detail.typebook && detail.typebook == 'virtual' ?
          <>
            <img src={ebook} alt="imageD" /><p>ebook</p></> : <><img src={physical} alt="imageDet" /><p>Physical book</p></>}
        </div>
        <div class='comprar-right'>
          <h3 >{detail.price}</h3>
          
          <button onClick={e=>paymentHandler(e)} className='button' >Buy</button></div>
      </div>

        </div>
        </div>
        </div>
      </div>



    </div>
  )
};
