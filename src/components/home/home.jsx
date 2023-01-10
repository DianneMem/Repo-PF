import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from "react-icons/fi";
import {
  findUserStripe,
  getAllBooks,
  getUsersDetail,
  setPage,
} from "../../redux/actions";
import jwt from "jwt-decode";
import Card from "../card/card";
import Paginated from "../paginado/Paginated";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import SideBar from "../sidebar/Sidebar";
import s from "./home.module.css";
import DarkMode from "../DarkMode/DarkMode";

import { Button, Grid, Box, CardMedia, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import Stack from "@mui/joy/Stack";
import { Favorite } from "@mui/icons-material";
import Footer from "../Footer/Footer";

export default function Home() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.darkMode);

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
  const loadBooks = useSelector((state) =>
    state.books.filter((e) => e.available === true)
  );
  let currentPageGlobal = useSelector((state) => state.currentPage);
  const token = useSelector((state) => state.sessionState);
  const stripeId = useSelector((state) => state.stripeState);

  useEffect(() => {
    dispatch(getAllBooks());
    setCurrentPage(1);
    dispatch(setPage(1));
  }, [dispatch]);
  if (token.length !== 0) {
    let currentToken = token;

    localStorage.setItem("session", "[]");
    let session = JSON.parse(localStorage.getItem("session"));
    session.push(currentToken);
    localStorage.setItem("session", JSON.stringify(session));

    localStorage.setItem("stripe", "[]");
    let stripe = JSON.parse(localStorage.getItem("stripe"));
    stripe.push(stripeId);
    localStorage.setItem("stripe", JSON.stringify(stripe));
  }

  // Local States
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(12);
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = loadBooks.slice(IndexOfFirstBooks, indexOfLastBooks);
  let pages = Math.ceil(loadBooks.length / booksPerPage);

  // Functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(setPage(pageNumber));
  };

  function changePage(e) {
    e.preventDefault();
    if (e.target.value === "less" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    } else if (e.target.value === "more" && currentPage !== pages) {
      setCurrentPage(currentPage + 1);
    }
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
  }
  */




  return (
    <React.Fragment>
      <Header />
      

          <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="flex-start">
          <div className={s.components}>
            <div className={s.cards}>
              {currentBooks?.map((b) => {
                return (
                  <div key={b._id} className={s.card}>
                    <Card
                      id={b._id}
                      title={b.title}
                      image={b.image}
                      typebook={b.typebook}
                      price={b.price}
                      author={b.author}
                      type={b.typebook}
                      product={b}
                    />
                  </div>
                );
              })}
            </div>

            <SideBar />
          </div>
          
          </Grid>
          {allBooks.length ? (
        <div
          className={s.container}
         
        >
          <div className={s.paginated}>
            {currentPage !== 1  ? (
              <button
                className={s.pageBtn}
                value="less"
                onClick={(e) => changePage(e)}
              >
                {"<"}
              </button>
            ) : (
              <div></div>
            )}

            <Paginated
              booksPerPage={booksPerPage}
              allBooks={loadBooks.length}
              paginate={paginate}
            />

            {currentPage !== pages ? (
              <button
                className={s.pageBtn}
                value="more"
                onClick={(e) => changePage(e)}
              >
                {">"}
              </button>
            ) : (
              <div></div>
            )}
          </div>

        </div>
      ) : (
        <Loader />
      )}
      <Footer/>
    </React.Fragment>
  );
}
