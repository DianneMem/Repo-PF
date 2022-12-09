import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { getAllBooks, setPage } from "../../redux/actions";

import Card from "../card/card";
import Paginated from "../paginado/Paginated";
import SearchBar from "../searchBar/SearchBar";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import SideBar from "../sidebar/Sidebar";
import s from "./home.module.css";



export default function Home() {

  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState(1);
  // let currentPageGlobal = useSelector((state) => state.currentPage);
  const [booksPerPage, setBooksPerPage] = useState(12);
  const [order, setOrder] = useState("");
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = allBooks.slice(IndexOfFirstBooks, indexOfLastBooks);
  const [loading, setLoading] = useState(false);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(setPage(pageNumber));
    // setOrder("")
  };

  useEffect(() => {
    dispatch(getAllBooks());
    setCurrentPage(1);
    dispatch(setPage(1));
    
  }, [dispatch]);

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
      alert("No recipes found");
    }
  } 

  return (
    <React.Fragment>
      <Header/>
      <SearchBar/>
      <br/>
      <SideBar/>
      <br/>
      <Paginated
        booksPerPage={booksPerPage}
        allBooks={allBooks.length}
        paginate={paginate}
      />
      <br/>
      <div className={s.cards}>
        {currentBooks?.map((b) => {return (
          <div key={b._id} className={s.card}>
          <button className={s.favorite}>
            <FiHeart />
          </button>
          <Card
            id={b._id}
            title={b.title}
            image={b.image}
            typebook={b.typebook}
            price={b.price}
            author={b.author}
            type={b.typebook}
          />
          </div>
        )})}
      </div>
    </React.Fragment>
  );
}
