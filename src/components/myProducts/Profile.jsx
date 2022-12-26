import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers , disablePost, deletePost, getCategories,  getGenders, getLanguages, getAllAuthor, getAllSaga, getAllEditorial } from "../../redux/actions";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import s from "../dashboardAdmin/dashboardAdmin.module.css";
import MyProducts from "./MyProducts";


export default function Profile() {
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
  }, [dispatch]);

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
  const loadBooks = useSelector((state) => state.books);
  const allUsers = useSelector((state) => state.users);

  // Local States
  let session = JSON.parse(localStorage.getItem("session"));
  let aux = allBooks.filter((e) => e.sellerId === session[0].id);
  
  let [productInput, setProductInput] = useState({});
  const [advice, setAdvice] = useState('');
  console.log(productInput)
  console.log(loadBooks);

  
  // Functions


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
  


  

 
 
  return (
    <React.Fragment>
      <Header noSearch={true}/>
      <br />
      <br />
      <br />
      <br />
      <br />
      {aux.length ? (
        <div className={s.container}>
        
          <div className={s.cardsContainer}>
            
            <div className={s.cards}>
              {aux?.map((b) => {
                return (
                  <div key={b._id}>
                    <MyProducts
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
          </div>
          <br/>
          <hr/>
          <br/>
          <br/>
      
        </div>) :
        (<>
          <p>Loading Products</p>
          <Loader />
      </>)}
      
      <br/>
      <hr/>
    </React.Fragment>
  );
}
