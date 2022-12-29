import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers , disablePost, deletePost, getCategories,  getGenders, getLanguages, getAllAuthor, getAllSaga, getAllEditorial } from "../../redux/actions";
import DashCard from "../dashCard/dashCard";
import Paginated from "../paginado/Paginated";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import SideBar from "../sidebar/Sidebar";
import s from "./dashboardAdmin.module.css";
import { Link } from "react-router-dom";
import CreatePost from "../createProduct/CreateProduct";
import DashUser from "../dashUser/dashUser";
import {Register} from "../register/Register";

import Modal from '@mui/material/Modal';




export default function DashAdmin() {
  // Call Global States
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getAllUsers());
    dispatch(getCategories());
    dispatch(getGenders());
    dispatch(getLanguages());
    dispatch(getAllAuthor());
    dispatch(getAllSaga());
    dispatch(getAllEditorial());
    setCurrentPage(1);
  }, [dispatch]);

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
  const loadBooks = useSelector((state) => state.books);
  const allUsers = useSelector((state) => state.users);
  

  // Local States
  const [section, setSection] = useState('Products');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = loadBooks.slice(IndexOfFirstBooks, indexOfLastBooks);
  const pages = Math.ceil(loadBooks.length / booksPerPage);
  

  const [createProduct, setCreateProduct] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const [menu, setMenu] = useState(false); 
  // Constante para desplegar el menú lateral hecho sin material (solo css)

  console.log('books', loadBooks);
  console.log('users', allUsers)
  
  
  // Functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  function getBooks(e){
    e.preventDefault();
    dispatch(getAllBooks());
    setCurrentPage(1);
  }

  function changePage(e) {
    e.preventDefault();
    if (e.target.value === "less" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (e.target.value === "more" && currentPage !== pages) {
      setCurrentPage(currentPage + 1);
    }
  }

  async function disableItem(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(disablePost(itemId));
    dispatch(getAllBooks());
  }
  
  async function deleteItem(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(deletePost(itemId));
    dispatch(getAllBooks());
  }
  
  function handleSections(e){
    e.preventDefault();
    setSection(e.target.value);
    menuDisplay(e)
  };
  
  function handleCreateProduct(e){
    e.preventDefault();
    if(createProduct) {setCreateProduct(false);}
    else {setCreateProduct(true);}
  };
  
  function handleCreateUser(e){
    e.preventDefault();
    if(createUser) {setCreateUser(false);}
    else {setCreateUser(true);}
  };
  
  function menuDisplay(e){
    e.preventDefault();
    if(menu) {setMenu(false);}
    else {setMenu(true);}
  }

  return (
    <React.Fragment>
      <Header noSearch={true}/>
      
      
     {/* <button onClick={(e) => menuDisplay(e)}>Menu</button>
      <div className={menu? (s.sideBar2) : (s.sideBar1)}>
        <button onClick={(e) => menuDisplay(e)}>Close</button>
        <button onClick={(e) => handleSections(e)} value='Products'>Products</button>
        <button onClick={(e) => handleSections(e)} value='Users'>Users</button>
        <button onClick={(e) => handleSections(e)} value='Orders'>Orders</button>
        <button onClick={(e) => handleSections(e)} value='Reviews'>Reviews</button>
      </div> */}
      
      
      
      
    <div className={s.page}>
  
      <nav className={s.nav_side}>
        <ul className={s.nav_container}>
          <li className={s.nav_items}>
            <svg viewBox="0 0 20 20">
							<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
						</svg>
            <button onClick={(e) => handleSections(e)} value='Products'>Products</button>
          </li>
          
          <li className={s.nav_items}>
            <svg viewBox="0 0 20 20">
							<path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
						</svg>
            <button onClick={(e) => handleSections(e)} value='Users'>Users</button>
          </li>
            
          <li className={s.nav_items}>
            <svg viewBox="0 0 20 20">
							<path d="M10,1.375c-3.17,0-5.75,2.548-5.75,5.682c0,6.685,5.259,11.276,5.483,11.469c0.152,0.132,0.382,0.132,0.534,0c0.224-0.193,5.481-4.784,5.483-11.469C15.75,3.923,13.171,1.375,10,1.375 M10,17.653c-1.064-1.024-4.929-5.127-4.929-10.596c0-2.68,2.212-4.861,4.929-4.861s4.929,2.181,4.929,4.861C14.927,12.518,11.063,16.627,10,17.653 M10,3.839c-1.815,0-3.286,1.47-3.286,3.286s1.47,3.286,3.286,3.286s3.286-1.47,3.286-3.286S11.815,3.839,10,3.839 M10,9.589c-1.359,0-2.464-1.105-2.464-2.464S8.641,4.661,10,4.661s2.464,1.105,2.464,2.464S11.359,9.589,10,9.589"></path>
						</svg>
           <button onClick={(e) => handleSections(e)} value='Orders'>Orders</button>
          </li>
            
          <li className={s.nav_items}>
            <svg viewBox="0 0 20 20">
							<path d="M11.709,7.438H8.292c-0.234,0-0.427,0.192-0.427,0.427v8.542c0,0.234,0.192,0.427,0.427,0.427h3.417c0.233,0,0.426-0.192,0.426-0.427V7.865C12.135,7.63,11.942,7.438,11.709,7.438 M11.282,15.979H8.719V8.292h2.563V15.979zM6.156,11.709H2.74c-0.235,0-0.427,0.191-0.427,0.426v4.271c0,0.234,0.192,0.427,0.427,0.427h3.417c0.235,0,0.427-0.192,0.427-0.427v-4.271C6.583,11.9,6.391,11.709,6.156,11.709 M5.729,15.979H3.167v-3.416h2.562V15.979zM17.261,3.167h-3.417c-0.235,0-0.427,0.192-0.427,0.427v12.812c0,0.234,0.191,0.427,0.427,0.427h3.417c0.234,0,0.427-0.192,0.427-0.427V3.594C17.688,3.359,17.495,3.167,17.261,3.167 M16.833,15.979h-2.562V4.021h2.562V15.979z"></path>
						</svg>
            <button onClick={(e) => handleSections(e)} value='Reviews'>Reviews</button>
          </li>
              
        </ul>
      </nav>

      
      
      
      
      
  
      
      
      
      <div className={s.content}>
     
      {section === 'Products' && <>
      

      <SideBar vertical={false}/>
      
      
      
      {createProduct &&
      (<Modal open={createProduct}>
        <div className={s.createPost}>
        <button  onClick={e => handleCreateProduct(e)}>Close Form</button>
          <CreatePost/>
        </div>
        </Modal>) 
      }
      
      <div className={s.titles}>
        <h3>Books</h3>
        <div>
          <button onClick={e => getBooks(e)}>Refresh</button>
          <button onClick={e => handleCreateProduct(e)}>New</button>
        </div>
      </div>
      
      {allBooks.length ? (
        <div className={s.container}>
          
          <div className={s.paginated}>
            {currentPage !== 1 ? 
            (<button className={s.pageBtn} value="less" onClick={(e) => changePage(e)}>
              {"<"}
            </button>
            ) : 
            (<button className={s.noBtn} disabled>
              {"<"}
            </button>
            )}
            <Paginated
              booksPerPage={booksPerPage}
              allBooks={loadBooks.length}
              paginate={paginate}
            />
            {currentPage !== pages ? 
            (<button className={s.pageBtn} value="more"onClick={(e) => changePage(e)}>
              {">"}
            </button>) : 
            (<button className={s.noBtn} disabled>
              {">"}
            </button>)}
          </div>
          <div className={s.cards}>
            {currentBooks?.map((b) => {
              return (
              <div key={b._id}>
                <DashCard
                id={b._id}
                title={b.title}
                image={b.image}
                typebook={b.typebook}
                price={b.price}
                author={b.author}
                categorie={b.categorie}
                editorial={b.editorial}
                saga={b.saga}
                language={b.language}
                gender={b.gender}
                year={b.year}
                state={b.state}
                available={b.available}
                disable={disableItem}
                deletes={deleteItem}
                />
              </div>)
            })}
          </div>
          
          
          
          
          
          
          

        </div>) :
        (<>
          <p>Loading Products</p>
          <Loader />
      </>)}
      
      </>}
      
      
      {section === 'Users' && <>
      
      {createUser? 
      (<>
      <button onClick={e => handleCreateUser(e)}>Close Form</button>
      <Register/>
      </>) : 
      (<button onClick={e => handleCreateUser(e)}>Create User</button>)}
      
      <div className={s.titles}>
        <h3>Users</h3>
        <div>
          <button>Refresh</button>
          <button>New</button>
        </div>
      </div>
      
      {allUsers.length ? (
      <div className={s.container}>
        <div className={s.cards}> 
          {allUsers?.map((u)=>{return(
          <DashUser user={u}/>
          )})}
        </div>
      </div>) : 
      (<>
      <p>Loading Users</p>
      <Loader />
      </>)
      }
      
      </>}
      
      
      {section === 'Orders' && (<>
      <h3>Orders</h3>
      <p>Empty for now</p>
      </>)}
      
      
      {section === 'Reviews' && (<>
      <h3>Reviews</h3>
      <p>Empty for now</p>
      </>)}
      
      
      <br/>
      <hr/>
    
      </div>
      </div>
    </React.Fragment>
  );
}
