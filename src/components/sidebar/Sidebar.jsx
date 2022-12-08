import React from 'react'
import s from './Sidebar.module.css'



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
