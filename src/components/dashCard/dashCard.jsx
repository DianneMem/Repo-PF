import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBooks, modifyPost } from "../../redux/actions";

import defaultImage from '../../assets/bookDefault.png';
import s from './dashCard.module.css';

export default function DashCard({id, title, image, typebook, price, author, categorie, editorial, saga, language, gender, year, state, available, deletes, disable }){

  // Only First Mayus
  let titlemod = title.toLowerCase().split(' ').join(' ');
  let mayus = title[0].toUpperCase();
  titlemod = mayus + titlemod.slice(1,titlemod.length);
  title = titlemod;
  
  // Max title characters
  const maxLength1 = 60;
  if(title.length > maxLength1){
  title = title.slice(0,maxLength1) + '...'
  };
  if(saga && saga.length > maxLength1){
  saga = saga.slice(0,maxLength1) + '...'
  }
  
  // Max author words
  const maxLength2 = 22;
  if(author.length > maxLength2){
    author = author.split(' ').slice(0,2).join(' ');
  }
  
  //Global States
  const allCategories = useSelector(state => state.categories);
  const allGenders = useSelector(state => state.genders);
  const allLanguages = useSelector(state => state.languages);
  
  const dispatch = useDispatch();
  
  
  // Local States
  const [isForm, setIsForm] = useState(false);
  const [input, setInput] = useState({
    title: title,
    author: author,
    editorial: editorial,
    language: language,
    year: year,
    state: state,
    typebook: typebook,
    price: price,
    categorie: categorie,
    gender: gender
  });
  const [error, setError] = useState({});
  if(isForm) console.log(input);
  if(isForm) console.log('formError', error);
  
  function switchForm(e){
    e.preventDefault();
    setInput({
      title: title,
      author: author,
      editorial: editorial,
      language: language,
      year: year,
      state: state,
      typebook: typebook,
      price: price,
      categorie: categorie,
      gender: gender
    });
    // document.getElementById('title').value = title;
    // document.getElementById('author').value = author;
    // document.getElementById('editorial').value = editorial;
    // document.getElementById('year').value = year;
    // document.getElementById('price').value = price;
    isForm ? setIsForm(false) : setIsForm(true);
  };

  
  function validate(input){
    let actualYear = new Date().getFullYear();
    let RegEXP = /[`ª!@#$%^*_+\=\[\]{};"\\|,<>\/~]/;
    let err = {};
    
    if (!input.title) {err.title = "· Title is required"} 
    else if (RegEXP.test(input.title)) {err.title = "· Special characters are not accepted"}
    else if(input.title.length > 200) {err.title = "· Title too long"}
    
    else if (!input.author) {err.author = "· Author is required"}
    else if (RegEXP.test(input.author)) {err.author = "· Special characters are not accepted"}
    else if(input.author.length > 200) {err.author = "· Author name too long"}
    
    
    else if (!input.editorial) {err.editorial = "· Editorial is required"}
    else if (RegEXP.test(input.editorial)) {err.editorial = "· Special characters are not accepted"}
    else if(input.editorial.length > 200) {err.editorial = "· Editorial name too long"}
    
    else if (!input.gender.length) {err.gender = "· Select at least one gender"}
    
    else if (!input.year) {err.year = "· Year input is required"}
    else if (input.year < 0 || input.year > actualYear) {err.year = "· Year input Error"}
    
    else if (!input.price || input.price < 0) {err.price = "· Price input Error"}
    
    return (err);
  };
  
  function inputChange(e){
    e.preventDefault();
    setInput({
    ...input,
    [e.target.name]: e.target.value
    });
    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  };
  function selectCategorie(e){
    e.preventDefault();
    setInput({
      ...input,
      categorie: e.target.value
    });
  };
  function selectGenders(e){
    e.preventDefault();
    if(!input.gender.includes(e.target.value)){
      setInput({
        ...input,
        gender: [...input.gender, e.target.value]
      });
      setError(validate({
        ...input,
        gender:[...input.gender, e.target.value]
      }));
    }
    document.getElementById('GenderSelector').selectedIndex = 'DEFAULT';
  };
  function unselectGenders(e){
    e.preventDefault();
    if(input.gender.includes(e.target.value)){
      setInput({
        ...input,
        gender: input.gender.filter(gen => gen !== e.target.value)
      });
      setError(validate({
        ...input,
        gender: input.gender.filter(gen => gen !== e.target.value)
      }));
    };
  };
  function SelectLanguage(e){
    e.preventDefault();
    setInput({
      ...input,
      language: e.target.value
    });
  };
  function changeState(e){
    e.preventDefault();
    if(input.state === 'New'){
      setInput({
        ...input,
        state: 'Used'
      })
    }else{
      setInput({
        ...input,
        state: 'New'
      })
    };
  };
  function changeType(e){
    e.preventDefault();
    if(input.typebook === 'physical'){
      setInput({
        ...input,
        typebook: 'virtual'
      })
    }else{
      setInput({
        ...input,
        typebook: 'physical'
      })
    };
  };
  async function modify(e){
    e.preventDefault();
    const inputSend = input;
    console.log('SEND', inputSend);
    await dispatch(modifyPost(id, inputSend));
    dispatch(getAllBooks());
    setIsForm(false);
  };
  

return(
  <React.Fragment>
    
    {isForm ? 
    ( <div key={id} className={s.card}>
      <img src={image? (image) : (defaultImage)} alt='Book' className={s.image}/>
      <div className={s.info}>
        <p>Title: </p>
        <input id='title' type='text' className={s.inputTransparent} name='title' onChange={(e)=>inputChange(e)} placeholder={title} />
        <div>
          <span>Category: </span>
          <select onChange={(e) => selectCategorie(e)} defaultValue={categorie}>
            <option value='DEFAULT' disabled>Categories</option>
            {allCategories?.map(cat => {return(
            <option value={cat}>{cat}</option>
            )})}
          </select>
        </div>
        <div>
          <span>Genders:</span>
          {/* <span>{input.gender?.join(', ')}</span> */}
          {input.gender?.map(gen => {return(
          <button value={gen} onClick={e => unselectGenders(e)}>{gen}</button>
          )})}
          <span>Select Genders: </span>
          <select id='GenderSelector' onChange={(e) => selectGenders(e)} defaultValue='DEFAULT'>
            <option value='DEFAULT' disabled>Genders</option>
            {allGenders?.map(gen => {return(<option value={gen}>{gen}</option>)})}
          </select>
        </div>
        <div className={s.infoContainer}> 
          <div>
            <p>Author: </p>
            <input id='author'  type='text' className={s.inputTransparent} name='author' onChange={(e)=>inputChange(e)} placeholder={author}/>
          </div>
          <p>|</p>
          <div>
            <p>Editorial: </p>
            <input id='editorial'  type='text' className={s.inputTransparent} name='editorial' onChange={(e)=>inputChange(e)} placeholder={editorial}/>
          </div>
          <p>|</p>
          <div>
            <p>Language: </p>
            <select onChange={e => SelectLanguage(e)} defaultValue={language}>
              <option value='DEFAULT' disabled>Languages</option>
              {allLanguages?.map(lan => {return(<option value={lan}>{lan}</option>)})}
            </select>
          </div>
          <p>|</p>
          <div>
            <p>Year: </p>          
            <input id='year' type='number' className={s.inputTransparent} name='year' onChange={(e)=>inputChange(e)}  placeholder={year} step='1'/>
          </div>
          <p>|</p>
          <div>
            <p>State: </p>
            <p>{input.state}</p>
            {input.state === 'New' ? 
            (<>
              <button disabled>New</button>
              <button onClick={(e)=>changeState(e)}>Used</button>
            </>) : 
            (<>
              <button onClick={(e)=>changeState(e)}>New</button>
              <button disabled>Used</button>
            </>)} 
          </div>
          <p>|</p>
          <div>
            <p>Type: </p>
            <p>{input.typebook}</p>
            {input.typebook === 'physical' ? 
            (<>
              <button disabled>Physical</button>
              <button onClick={(e)=>changeType(e)}>Virtual</button>
            </>) : 
            (<>
              <button onClick={(e)=>changeType(e)}>Physical</button>
              <button disabled>Virtual</button>
            </>)}
          </div>
          <p>|</p>
          <div>
            <p>$</p>
            <input id='price' type='number' step='0.01' className={s.inputTransparent} name='price' onChange={(e)=>inputChange(e)}  placeholder={price}/>
          </div>
          <p>|</p>
          {available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
        </div>
        <div className={s.infoContainer}>
          {available? (<button value={id} onClick={e => disable(e)} className="btn btn-outline-warning">Disable</button>) : 
          (<button value={id} onClick={e => disable(e)} className="btn btn-outline-warning">Enable</button>)}
          <button value={id} onClick={e => deletes(e)} className="btn btn-outline-danger">Delete</button>
          <button value={id} onClick={e => switchForm(e)} className="btn btn-outline-primary">Cancel</button>
          {Object.values(error).length? (<span>{Object.values(error)[0]}</span>) : (<button value={id} onClick={e => modify(e)} className="btn btn-outline-success">Confirm</button>)}
        </div>
      </div>
    </div>) 
    : 
    (<div key={id} className={s.card}>
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
          <p>${price}</p>
          <p>|</p>
          {available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
        </div>
        <div className={s.infoContainer}>
          {available? (<button value={id} onClick={e => disable(e)} className="btn btn-outline-warning">Disable</button>) : 
          (<button value={id} onClick={e => disable(e)} className="btn btn-outline-warning">Enable</button>)}
          <button value={id} onClick={e => deletes(e)} className="btn btn-outline-danger">Delete</button>
          <button value={id} onClick={e => switchForm(e)} className="btn btn-outline-primary">Modify</button>
        </div>
      </div>
    </div>
    )}
 </React.Fragment>
)}

   
    
    
    
    