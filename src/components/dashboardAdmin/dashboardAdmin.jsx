import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers , disablePost, deletePost, disableUser, deleteUser, modifyUser } from "../../redux/actions";

import DashCard from "../dashCard/dashCard";
import Paginated from "../paginado/Paginated";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import SideBar from "../sidebar/Sidebar";
import s from "./dashboardAdmin.module.css";
import { Link } from "react-router-dom";


export default function Home() {
  // Call Global States
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
    dispatch(getAllUsers());
    setCurrentPage(1);
  }, [dispatch]);

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
  const allUsers = useSelector((state) => state.users);
  
  
  const loadBooks = useSelector((state) => state.books);

  // Local States
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = loadBooks.slice(IndexOfFirstBooks, indexOfLastBooks);
  let pages = Math.ceil(loadBooks.length / booksPerPage);
  
  let [userInput, setUserInput] = useState({});
  console.log(userInput)
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
  }

  // Loading SetTimeOut
  /* 
  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 4000);
  };
  if (loading === false) {
    changeState();
    return <Loader />;
  } else {
    if (allBooks.length === 0) {
      dispatch(getAllBooks());
      setLoading(false);
      // alert("No books found");
    }
  } */
  console.log(allBooks);
  console.log('users-admin', allUsers)
  
  
  
  

  return (
    <React.Fragment>
      <Header noSearch={true}/>
      <br />
      <br />
      <br />
      <br />
      <br />
      
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

          <div className={s.cards}>
            {currentBooks?.map((b) => {
              return (
                <div key={b._id} className={s.card}>
                  <DashCard
                    id={b._id}
                    title={b.title}
                    image={b.image}
                    typebook={b.typebook}
                    price={b.price}
                    author={b.author}
                    type={b.typebook}
                  />
                  {b.available ? 
                  (<button value={b._id} className={s} onClick={e => disableItem(e)}>
                    Disable
                  </button>) : 
                  (<button value={b._id} className={s} onClick={e => disableItem(e)}>
                    Enable
                  </button>)}
                  
                  <button value={b._id} className={s} onClick={e => deleteItem(e)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
          
          <br/>
          <Link to={"/createproduct"}><button>Create Product</button></Link>
          <br/>
        </div>) :
        (<>
          <p>Loading Products</p>
          <Loader />
      </>)}
      
      <br/>
      <hr/>
      
      {allUsers.length ? (
        <div className={s.container}>    
        <h3>Users</h3>
        
        {allUsers?.map((u)=>{return(
        <form className={s.user} onSubmit={(e) => modifyUserById(e, u)}>
          <p>id: {u._id}</p>
          <p>role: {u.role}</p>
          {u.role === 'user' ? 
          (<button name='role' value='admin' onClick={(e)=>handleInputs(e)}>admin</button>) : 
          (<button name='role' value='user' onClick={(e)=>handleInputs(e)}>user</button>)}
          <p>username: {u.username}</p>
          <input type='text' name='username' onChange={(e)=>handleInputs(e)} placeholder={'New username'}/>
          <p>firstname: {u.firstname}</p>
          <input type='text' name='firstname' onChange={(e)=>handleInputs(e)} placeholder={'New firstname'}/>
          <p>lastname: {u.lastname}</p> 
          <input type='text' name='lastname' onChange={(e)=>handleInputs(e)} placeholder={'New lastname'}/>     
          <p>adress: {u.adress}</p>
          <input type='text' name='adress' onChange={(e)=>handleInputs(e)} placeholder={'New adress'}/>
          <p>email: {u.email}</p>
          <input type='email' name='email' onChange={(e)=>handleInputs(e)} placeholder={'New email'}/>
          <p>phone: {u.phone}</p>
          <input type='tel' name='phone' onChange={(e)=>handleInputs(e)} placeholder={'New phone'}/>
          
          <button type='submit'>Modify</button>
          <hr/>
          {u.available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
          {u.available ? 
          (<button value={u._id} className={s} onClick={e => disableUserById(e)}>
            Disable
          </button>) : 
          (<button value={u._id} className={s} onClick={e => disableUserById(e)}>
            Enable
          </button>)}
          <button value={u._id} className={s} onClick={e => deleteUserById(e)}>
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
      
      <p>Create User</p>
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
      </form>
      
    </React.Fragment>
  );
}
