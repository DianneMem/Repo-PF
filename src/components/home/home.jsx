import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiHeart } from "react-icons/fi";
import { getAllBooks, setPage } from "../../redux/actions";

import Card from "../card/card";
import Paginated from "../paginado/Paginated";
import Loader from "../loader/Loader";
import Header from "../header/Header";
import SideBar from "../sidebar/Sidebar";
import s from "./home.module.css";

export default function Home() {
  // Call Global States
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBooks());
    setCurrentPage(1);
    dispatch(setPage(1));
  }, [dispatch]);

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
  const loadBooks = useSelector((state) => state.books);
  let currentPageGlobal = useSelector((state) => state.currentPage);

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

  console.log(currentPage);

  // Loading SetTimeOut

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

  console.log(allBooks);

  return (
    <React.Fragment>
      <Header />
      <br />
      <SideBar />

      {allBooks.length ? (
        <div className={s.container}>
           <div className={s.paginated}>
          {currentPage !== 1 ? (
            <button
              className={s.pageBtn}
              value="less"
              onClick={(e) => changePage(e)}
            >
              {"<"}
            </button>
          ) : (
            <button className={s.noBtn} disabled>
              {"<"}
            </button>
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
            <button className={s.noBtn} disabled>
              {">"}
            </button>
          )}
            </div>

          <div className={s.cards}>
            {currentBooks?.map((b) => {
              return (
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
              );
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </React.Fragment>
  );
}
