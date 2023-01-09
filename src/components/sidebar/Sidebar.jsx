
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCategories,  getGenders, getLanguages, getAllAuthor, getAllSaga, getAllEditorial, filterBooks, filterPrice, orderBooks, getAllBooks } from "../../redux/actions";
import Loader from "../loader/Loader";
import s1 from './Sidebar-1.module.css';
import s2 from './Sidebar-2.module.css';

import { Button, Typography } from "@mui/material";
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';



export default function SideBar({vertical=true}) {
	
	const dispatch = useDispatch();
	useEffect(() => {
    dispatch(getCategories());
    dispatch(getGenders());
    dispatch(getLanguages());
    dispatch(getAllAuthor());
    dispatch(getAllSaga());
    dispatch(getAllEditorial());
  }, [dispatch]);
    
  
	// Global States
	const categories = useSelector(state => state.categories);
	const genders = useSelector(state => state.genders);
	const author = useSelector(state => state.allAuthor);
	const editorials = useSelector(state => state.allEditorial);
	const sagas = useSelector(state => state.allSaga);
	const languages = useSelector(state => state.languages);
  const filters = useSelector(state => state.filters);
  // Local States
  const [minState,setMinState]=useState("");
  let [orderB, setOrderB] = useState('');
 
  


  // Button Functions
	function select(e){
    let filter = {[e.target.name]: e.target.value};
	  
	  if(e.target.name === 'priceMin'){
	    if((!filters.priceMax || parseInt(e.target.value) < parseInt(filters.priceMax)) && parseInt(e.target.value) >= 0){
	      dispatch(filterBooks(filter))}
	  } else if(e.target.name === 'priceMax'){
	    if((!filters.priceMin || parseInt(e.target.value) > parseInt(filters.priceMin)) && parseInt(e.target.value) >= 1){
	      dispatch(filterBooks(filter))}
	  }else{
      dispatch(filterBooks(filter))
  	  document.getElementById('SelectCategory').selectedIndex = 'DEFAULT';
  	  document.getElementById('SelectGender').selectedIndex = 'DEFAULT';
  	  document.getElementById('SelectAuthor').selectedIndex = 'DEFAULT';
  	  document.getElementById('SelectEditorial').selectedIndex = 'DEFAULT';
  	  document.getElementById('SelectSaga').selectedIndex = 'DEFAULT';
  	  document.getElementById('SelectLanguage').selectedIndex = 'DEFAULT';
    };
	};
	
  function order(e) {
    e.preventDefault();
    dispatch(orderBooks(e.target.value));
    setOrderB(e.target.value);
    
  };
  function refreshButton(e) {
    e.preventDefault();
    dispatch(filterBooks('Clear'));
  };

  
	return(<React.Fragment>
	
	{vertical? 
	(<div className={s1.nav}>
	  <button className={s1.btn0} onClick={e=>refreshButton(e)}>clear</button>

	  <div className={s1.state}>
      <button className={s1.btn1} onClick={e => select(e)} name='state' value='New'>New</button>
      <button className={s1.btn1} onClick={e => select(e)} name='state' value='Used'>Used</button>
      <button className={s1.btn1} onClick={e => select(e)} name='typebook' value='physical'>Physical</button>
      <button className={s1.btn1} onClick={e => select(e)} name='typebook' value='virtual'>Digital</button>
	  </div>
	
		<select id='SelectCategory' name='categorie' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
      <option key={'default1'} value='DEFAULT' disabled>Category</option>
      {categories.map((a)=> {return(
			<option key={a} value={a}>{a}</option>
			)})}
    </select>
    <select id='SelectGender' name='gender' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
      <option key={'default2'} value='DEFAULT' disabled>Gender</option>
      {genders.map((a)=> {return(
			<option key={a} value={a}>{a}</option>
			)})}
    </select>
    <select id='SelectAuthor' name='author' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
      <option key={'default3'} value='DEFAULT' disabled>Author</option>
      {author.map((a)=> {return(
			<option key={a} value={a}>{a}</option>
			)})}
    </select>
		<select id='SelectEditorial' name='editorial' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
      <option key={'default4'} value='DEFAULT' disabled>Editorial</option>
      {editorials.map((a)=> {return(
			<option key={a} value={a}>{a}</option>
			)})}
    </select>
    <select id='SelectSaga' name='saga' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
      <option key={'default5'} value='DEFAULT' disabled>Popular Saga</option> 
      {sagas.map((a)=> {return(
			<option key={a} value={a}>{a}</option>
			)})}
    </select>
		<select id='SelectLanguage' name='language' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
      <option key={'default6'} value='DEFAULT' disabled>Language</option>   
      {languages.map((a)=> {return(
			<option key={a} value={a}>{a}</option>
			)})}
    </select>
    
      <input 
      type='number'
      name='priceMin'
      placeholder='Min Price'
      min='0'
      max='1000000'
      step='1'
      onChange={(e)=> select(e)}
      />
      
      <input 
      type='number'
      name='priceMax'
      placeholder='Max Price'
      min='0'
      max='1000000'
      step='1'
      onChange={(e)=> select(e)}
      />


    <div className={s1.state}>
      <button className={s1.btn2} onClick={e => order(e)} value='LP'>Lower Price</button>
      <button className={s1.btn2} onClick={e => order(e)} value='HP'>Higher Price</button>
      <button className={s1.btn2} onClick={e => order(e)} value='AZ'>A-Z</button>
      <button className={s1.btn2} onClick={e => order(e)} value='ZA'>Z-A</button>
    </div>
    
    <div>
      {filters.categorie && 
      (<Button 
      variant="contained" 
      endIcon={<CancelTwoToneIcon />} 
      size="small"
      name='categorie' 
      value= ""
      onClick={e => select(e)}
      >
        {filters.categorie}
      </Button>)}
      
      {filters.gender && filters.gender.map(gender => 
      (<Button 
        variant="contained" 
        endIcon={<CancelTwoToneIcon />} 
        size="small"
        name='genderDelete' 
        value= {gender}
        onClick={e => select(e)}
        >
          {gender}
        </Button>))
      }
      
      {filters.author && 
      (<Button 
      variant="contained" 
      endIcon={<CancelTwoToneIcon />} 
      size="small"
      name='author' 
      value= ""
      onClick={e => select(e)}
      >
        {filters.author}
      </Button>)}
      
      {filters.editorial && 
      (<Button 
      variant="contained" 
      endIcon={<CancelTwoToneIcon />} 
      size="small"
      name='editorial' 
      value= ""
      onClick={e => select(e)}
      >
        {filters.editorial}
      </Button>)}
      
      {filters.saga && 
      (<Button 
      variant="contained" 
      endIcon={<CancelTwoToneIcon />} 
      size="small"
      name='saga' 
      value= ""
      onClick={e => select(e)}
      >
        {filters.saga}
      </Button>)}
      
      {filters.language && 
      (<Button 
      variant="contained" 
      endIcon={<CancelTwoToneIcon />} 
      size="small"
      name='language' 
      value= ""
      onClick={e => select(e)}
      >
        {filters.language}
      </Button>)}
      
      {filters.typebook && 
      (<Button 
      variant="contained" 
      endIcon={<CancelTwoToneIcon />} 
      size="small"
      name='typebook' 
      value= ""
      onClick={e => select(e)}
      >
        {filters.typebook}
      </Button>)}
      
      {filters.state && 
      (<Button 
      variant="contained" 
      endIcon={<CancelTwoToneIcon />} 
      size="small"
      name='state' 
      value= ""
      onClick={e => select(e)}
      >
        {filters.state}
      </Button>)}
      
      {filters.priceMin && 
      (<p
      variant="contained" 
      
      >
        Price Min: {filters.priceMin}
      </p>)}
      
      {filters.priceMax && 
      (<p
      variant="contained"
      size="small"
      >
        Price Max: {filters.priceMax}
      </p>)}
      
    </div>
    
	</div>) 
	:
	(<div className={s2.container} >
	
	  <div className={s2.state}>
      <div>
        <button className={s2.btn2} onClick={e => order(e)} value='LP'>Lower Price</button>
        <button className={s2.btn2} onClick={e => order(e)} value='HP'>Higher Price</button>
      </div>
      <div>
        <button className={s2.btn2} onClick={e => order(e)} value='AZ'>A-Z</button>
        <button className={s2.btn2} onClick={e => order(e)} value='ZA'>Z-A</button>
      </div>
    </div>
	
  
  	
  	<div className={s2.nav}>
      <div>
        <button  className={s2.btn1} onClick={e=>refreshButton(e)}>Clear</button>
        <button className={s2.btn1} onClick={e => select(e)} name='typebook' value='physical'>Physical</button>
    	  <button className={s2.btn1} onClick={e => select(e)} name='typebook' value='virtual'>Digital</button>
        <select id='SelectCategory' name='categorie' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
          <option key={'default1'} value='DEFAULT' disabled>Category</option>
          {categories.map((a)=> {return(
    			<option key={a} value={a}>{a}</option>
    			)})}
        </select>
        <select id='SelectGender' name='gender' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
          <option key={'default2'} value='DEFAULT' disabled>Gender</option>
          {genders.map((a)=> {return(
    			<option key={a} value={a}>{a}</option>
    			)})}
        </select>
        <select id='SelectAuthor' name='author' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
          <option key={'default3'} value='DEFAULT' disabled>Author</option>
          {author.map((a)=> {return(
    			<option key={a} value={a}>{a}</option>
    			)})}
        </select>
  	  </div>
  	  <div>
        <button className={s2.btn1} onClick={e => select(e)} name='state' value='New'>New</button>
        <button className={s2.btn1} onClick={e => select(e)} name='state' value='Used'>Used</button>
    	  <select id='SelectEditorial' name='editorial' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
          <option key={'default4'} value='DEFAULT' disabled>Editorial</option>
          {editorials.map((a)=> {return(
    			<option key={a} value={a}>{a}</option>
    			)})}
        </select>
        <select id='SelectSaga' name='saga' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
          <option key={'default5'} value='DEFAULT' disabled>Popular Saga</option> 
          {sagas.map((a)=> {return(
    			<option key={a} value={a}>{a}</option>
    			)})}
        </select>
    		<select id='SelectLanguage' name='language' onChange={e=> select(e)} defaultValue={'DEFAULT'} >
          <option key={'default6'} value='DEFAULT' disabled>Language</option>   
          {languages.map((a)=> {return(
    			<option key={a} value={a}>{a}</option>
    			)})}
        </select>
  	  </div>
	  </div>
	
	  <div className={s2.state}>
  	  
        <input 
        type='number'
        name='priceMin'
        placeholder='Min Price'
        min='0'
        max='1000000'
        step='1'
        onChange={(e)=> select(e)}
        />
       
        <input 
        type='number'
        name='priceMax'
        placeholder='Max Price'
        min='0'
        max='1000000'
        step='1'
        onChange={(e)=> select(e)}
        />
   
    </div>
    
	</div>)}
	
</React.Fragment>
)};












































/* 

const [ books, setBooks ] = useState([]);
const [ auth, setAuth] = useState();

useEffect(() => {
    dispatch(actions.getAllBooks())
    dispatch(actions.getAllUsers())
},[dispatch])
setBooks([...allBooks]),   [allBooks]


useEffect(() => {
    setBooks([...allBooks])
}, [allBooks])


const filterCategories =(e) =>{
    let search = e.target.value;
    let filter = [...allBooks].filter((c)=>c.categorie.toLowerCase().includes(search.toLowerCase()));
    setBooks(filter)
}

const handleCategories = (e) => {
    let value = e.target.value;
    document.getElementById('Category').selectedIndex = 'DEFAULT';
    console.log(value);

};

const filterSagas = (e) =>{
    let search = e.target.value;
    let filter = [...allBooks].filter((s)=>s.saga.toLowerCase().includes(search.toLowerCase()));
    setBooks(filter)
}

const handleSaga = (e) =>{
    let value = e.target.value;
    document.getElementById('Saga').selectedIndex = 'DEFAULT';
};

const filterGenders = (e)=>{
    let search = e.target.value;
    let filter = [...allBooks].filter((g)=>g.gender.toLowerCase().includes(search.toLowerCase()));
    setBooks(filter)
}
const handleGender = (e) => {
    let value = e.target.value;
    document.getElementById('Gender').selectedIndex = 'DEFAULT';
    
};

const filterAuth = (e) =>{
    let search = e.target.value;
    let filter = [...allBooks].filter((a)=>a.author.toLowerCase().includes(search.toLowerCase()));
    setBooks(filter)
}
const handleAuth = (e) => {
    let value = e.target.value;
    document.getElementById('Auth').selectedIndex = 'DEFAULT';
};

const filterEditorial =(e) => {
    let search = e.target.value;
    let filter = [...allBooks].filter((e)=>e.editorial.toLowerCase().includes(search.toLowerCase()));
    setBooks(filter)
}
const handleEdit = (e) => {
    let value = e.target.value;
    document.getElementById('Edit').selectedIndex = 'DEFAULT';
};

const filterLanguage=(e) => {
    let search = e.target.value;
    let filter = [...allBooks].filter((l)=>l.language.toLowerCase().includes(search.toLowerCase()));
    setBooks(filter)
}
const handleLenguage = (e) => {
    let value = e.target.value;
    document.getElementById('Language').selectedIndex = 'DEFAULT';
}

export default function Sidebar() {
  return (
    <div className={s.containerSidebar}>
       
                <select name="filterCategories" id='Category' onChange={(e)=>handleCategories(e)} defaultValue={'DEFAULT'}>
                    <option key={'default'}value="DEFAULT" disabled>Category</option>
            </select>
                        <select name='filterSagas' id='Sagas' onChange={(e)=>handleSaga(e)} defaultValue={'DEFAULT'}>
                <option key={'default'}value="DEFAULT" disabled>Saga</option>
                </select> 

<select name="filterGenders" id="Genders" onChange={(e)=>handleGender(e)} defaultValue={'DEFAULT'}>
    <option key={'default'}value="DEFAULT" disabled>Gender</option>
</select>

<select name="filterAuth" id="Auth" onChange={(e)=>handleAuth(e)} defaultValue={'DEFAULT'}>
    <option key={'default'} value="DEFAULT" disabled>Author</option>
</select>

<select name="filterEditorial" id="Edit" onChange={(e)=>handleEdit(e)} defaultValue={'DEFAULT'}>
    <option key={'defaut'} value="DEFAULT" disabled>Editorial</option>
</select>

<select name="filterLanguage" id="Language" onChange={(e)=>handleLenguage(e)} defaultValue={'DEFAULT'}>
    <option key={'default'} value="DEFAULT" disabled>Language</option>
</select>
    </div>
  )
}
 */
