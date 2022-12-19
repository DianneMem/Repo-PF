import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getCategories,  getGenders, getLanguages, getAllAuthor, getAllSaga, getAllEditorial, filterBooks, filterPrice, orderBooks, getAllBooks } from "../../redux/actions";
import Loader from "../loader/Loader";
import s from './Sidebar.module.css'


export default function SideBar() {
	
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
  
  // Local States
  const [minState,setMinState]=useState("");
  let [orderB, setOrderB] = useState('');
 
  


  // Button Functions
	function select(e){
	  let filter = {name: e.target.name, value: e.target.value};
	  dispatch(filterBooks(filter))
   
	};
	function priceMin(e){
    e.preventDefault()    
	  let filter = {name: "Min", value:minState};
	  dispatch(filterPrice(filter))
 
	};
  function priceMax(e){
    e.preventDefault()    
	  let filter = {name: "Max", value:minState};
	  dispatch(filterPrice(filter))
   
	};
  function inputMin(e){
    e.preventDefault()  
    setMinState(e.target.value)
    
  };
  function inputMax(e){
    e.preventDefault()  
    setMinState(e.target.value)
  
  };
  function order(e) {
    e.preventDefault();
    dispatch(orderBooks(e.target.value));
    setOrderB(e.target.value);
    
  };
  function refreshButton(e) {
    e.preventDefault();
    dispatch(getAllBooks());
   
  };

  
	return(
	<div className={s.nav}>
	  <button className={s.btn0} onClick={e=>refreshButton(e)}>clear</button>

	  <div className={s.state}>
      <button className={s.btn1} onClick={e => select(e)} name='state' value='New'>New</button>
      <button className={s.btn1} onClick={e => select(e)} name='state' value='Used'>Used</button>
      <button className={s.btn1} onClick={e => select(e)} name='typebook' value='virtual'>Digital</button>
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
    
    <form onSubmit={e=>{priceMin(e)}}>
      <input 
      type='number'
      name='Min'
      placeholder='Min'
      min='0'
      max='1000000'
      step='0.01'
      onChange={(e)=> inputMin(e)}
      />
      <button className={s.btn} type="submit">+</button>
    </form>
      <form onSubmit={e=>{priceMax(e)}}>
      <input 
      type='number'
      name='Max'
      placeholder='Max'
      min='0'
      max='1000000'
      step='0.01'
      onChange={(e)=> inputMax(e)}
      />
      <button className={s.btn} type="submit">+</button>
    </form>

    <div className={s.state}>
      <button className={s.btn2} onClick={e => order(e)} value='LP'>Lower Price</button>
      <button className={s.btn2} onClick={e => order(e)} value='HP'>Higher Price</button>
      <button className={s.btn2} onClick={e => order(e)} value='AZ'>A-Z</button>
      <button className={s.btn2} onClick={e => order(e)} value='ZA'>Z-A</button>
    </div>
    
	</div>
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
