import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers , disablePost, deletePost, disableUser, deleteUser, modifyUser, getCategories,  getGenders, getLanguages, getAllAuthor, getAllSaga, getAllEditorial, filterBooks, filterPrice, orderBooks } from "../../redux/actions";

import DashCard from "../dashCard/dashCard";
import Paginated from "../paginado/Paginated";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import SideBar from "../sidebar/Sidebar";
import s from "./dashboardAdmin.module.css";
import { Link } from "react-router-dom";
import CreatePost from "../createProduct/CreateProduct";


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
  let pages = Math.ceil(loadBooks.length / booksPerPage);
  
  let [userInput, setUserInput] = useState({});
  let [productInput, setProductInput] = useState({});
  let [createProduct, setCreateProduct] = useState(false);
  

  const [advice, setAdvice] = useState('');
  console.log(productInput)
  console.log(loadBooks);
  console.log('users&admins', allUsers)

  
  // Functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
  

  async function disableUserById(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(disableUser(itemId));
    dispatch(getAllUsers());
  }
  
  async function deleteUserById(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(deleteUser(itemId));
    dispatch(getAllUsers());
  }
  
  function handleInputs(e){
    e.preventDefault();
    setUserInput({
    ...userInput,
    [e.target.name]: e.target.value
    })
    setAdvice('Press Modify to change authorization');
  }

  async function modifyUserById(e, user){
    e.preventDefault();
    let inputSend = userInput;
    
    for (const property in inputSend) {
      if(inputSend[property] === ''){
        inputSend[property] = user[property]
      };
    }
    
    await dispatch(modifyUser(user._id, inputSend));
    dispatch(getAllUsers());
    setAdvice('');
  };
  
  
  function handleSections(e){
    e.preventDefault();
    setSection(e.target.value);
  };
  
  function handleCreate(e){
    e.preventDefault();
    if(createProduct) {setCreateProduct(false);}
    else {setCreateProduct(true);}
  };
  

 
 
  return (
    <React.Fragment>
      <Header noSearch={true}/>
      <br />
      <br />
      <br />
      <br />
      <br />
    
      <button onClick={(e) => handleSections(e)} value='Products'>Products</button>
      <button onClick={(e) => handleSections(e)} value='Users'>Users</button>
      <button onClick={(e) => handleSections(e)} value='Orders'>Orders</button>
      <button onClick={(e) => handleSections(e)} value='Reviews'>Reviews</button>
    
      {section === 'Products' && <>
      <h3>Products</h3>

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

          <div className={s.cardsContainer}>
            
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
                  </div>
                );
              })}
            </div>
            <SideBar/>
          </div>
          
          
          <br/>
          <hr/>
      
          <br/>
              
              {createProduct ? 
              (<div className={s.createPost}>
                <button onClick={e => handleCreate(e)}>Close Form</button>
                <CreatePost/>
              </div>) : 
              (<button onClick={e => handleCreate(e)}>Create Product</button>)}
          <br/>
      
        </div>) :
        (<>
          <p>Loading Products</p>
          <Loader />
      </>)}
      
      </>}
      
      
      {section === 'Users' && <>
      <h3>Users</h3>
      
      {allUsers.length ? (
        <div className={s.container}>    
        
        
        {allUsers?.map((u)=>{return(
        <form className={s.user} onSubmit={(e) => modifyUserById(e,u)}>
          <p>id: {u._id}</p>
          <div>
            <p>role: {u.role}</p>
            {u.role === 'user' ? 
            (<button name='role' value='admin' className="btn btn-outline-warning" onClick={(e)=>handleInputs(e,u)}>admin</button>) : 
            (<button name='role' value='user' className="btn btn-outline-warning" onClick={(e)=>handleInputs(e,u)}>user</button>)}
            <span>{advice}</span>
          </div>
          <div>
            <p>username: {u.username}</p>
            <input type='text' name='username' onChange={(e)=>handleInputs(e)} placeholder={'New username'}/>
          </div>
          {/* <p>firstname: {u.firstname}</p>
          <input type='text' name='firstname' onChange={(e)=>handleInputs(e)} placeholder={'New firstname'}/>
          <p>lastname: {u.lastname}</p> 
          <input type='text' name='lastname' onChange={(e)=>handleInputs(e)} placeholder={'New lastname'}/>     
          <p>adress: {u.adress}</p>
          <input type='text' name='adress' onChange={(e)=>handleInputs(e)} placeholder={'New adress'}/>
          <p>phone: {u.phone}</p>
          <input type='tel' name='phone' onChange={(e)=>handleInputs(e)} placeholder={'New phone'}/> */}
          <div>
            <p>email: {u.email}</p>
            <input type='email' name='email' onChange={(e)=>handleInputs(e)} placeholder={'New email'}/>
          </div>
          <button type='submit' className="btn btn-outline-primary">Modify</button>
          <hr/>
          {u.available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
          {u.available ? 
          (<button value={u._id} className="btn btn-outline-warning" onClick={e => disableUserById(e)}>
            Disable
          </button>) : 
          (<button value={u._id}className="btn btn-outline-warning" onClick={e => disableUserById(e)}>
            Enable
          </button>)}
          <button value={u._id} className="btn btn-outline-danger" onClick={e => deleteUserById(e)}>
            Delete
          </button>
        </form>
        )})}
    
              
      </div>) : 
      (<>
      <p>Loading Users</p>
      <Loader />
      </>)
      }
      
      <br/>
        <Link to={"/register"}><button>Create User</button></Link>
      <br/>
      
     {/*  <p>Create User</p>
      <form>
          <label>role</label>
          <button>user</button>
          <button>admin</button>
          <label>username:</label>
          <input type='text'/>
          <label>firstname:</label>
          <input type='text'/>
          <label>lastname: </label>         
          <input type='text'/>
          <label>adress:</label>
          <input type='text'/>
          <label>email:</label>
          <input type='email'/>
          <label>phone:</label>
          <input type='tel'/>
          <label>Password</label>
          <input type='text'/>
          <label>Repite password</label>
          <input type='text'/>
          <button type='submit'>Send</button>
      </form> */}
      
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
    </React.Fragment>
  );
}
