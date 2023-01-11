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
import vertical_Henry from "../../assets/Henry.png"
import horyzontal_Henry from "../../assets/Henry-Horyzontal.png"
import DarkMode from "../DarkMode/DarkMode";

import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Grid, Box, CardMedia, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import Stack from "@mui/joy/Stack";
import { Favorite } from "@mui/icons-material";
import Footer from "../Footer/Footer";
import { Alert } from "@mui/material";
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import FilterListOffOutlinedIcon from '@mui/icons-material/FilterListOffOutlined';

export default function Home() {
  const dispatch = useDispatch();
    const token = useSelector((state) => state.sessionState);
  const stripeId = useSelector((state) => state.stripeState);
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

  const theme = useSelector((state) => state.darkMode);
 
  

  // Global States
  const allBooks = useSelector((state) => state.allbooks);
 
  let loadBooks = useSelector((state) =>
    state.books.filter((e) => e.available === true)
  );
  if(localStorage.getItem("session")){
    let session = JSON.parse(localStorage.getItem("session"));
     loadBooks = loadBooks.filter(e=>e.sellerId!==session[0].id)
    
  }
  let currentPageGlobal = useSelector((state) => state.currentPage);


  useEffect(() => {
    dispatch(getAllBooks());
    setCurrentPage(1);
    dispatch(setPage(1));
  }, [dispatch]);


  // Local States
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(12);
  const indexOfLastBooks = currentPage * booksPerPage;
  const IndexOfFirstBooks = indexOfLastBooks - booksPerPage;
  const currentBooks = loadBooks.slice(IndexOfFirstBooks, indexOfLastBooks);
  let pages = Math.ceil(loadBooks.length / booksPerPage);
  
  const [menu, setMenu] = useState(true);
  const xlMediaQuery = useMediaQuery('(min-width:1536px)');
  const xsMediaQuery = useMediaQuery('(min-width:600px)');
  

  // Functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    dispatch(setPage(pageNumber));
  };

  
  function handleMenu(){
    if(menu) {setMenu(false)}
    else{setMenu(true)}
  };


  


return (<React.Fragment>
<Header />

{menu? 
(<Button onClick={handleMenu}><FilterListOffOutlinedIcon/></Button>) 
: (<Button onClick={handleMenu}><FilterListOutlinedIcon/></Button>)}

<Grid container spacing={2} sx={{mt:2}}>
  {menu? 
  (<>
  <Grid item xs={12} sm={7} md={5} lg={3.2} xl={2.6}>
    <SideBar /> 
  </Grid>
  <Grid item xs={12} sm={5} md={7} lg={8.8} xl={7}>
    <div>
      <Grid container spacing={0}>
        {currentBooks.length? 
        (
        currentBooks?.map((b) => {return (
        <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
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
        </Grid>
        )})
        ) :
        (<>
         <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Alert severity="info">There are no matches - Keep Searching!</Alert>
        </Grid>
        </>)
        }
      </Grid>
      <div className={s.paginated}>
        <Paginated
        booksPerPage={booksPerPage}
        allBooks={loadBooks.length}
        paginate={paginate}
        actualPage={currentPage}
        />
      </div>
    </div>
  </Grid>
  <Grid item xs={12} sm={12} md={12} lg={12} xl={2.4}>
    <div className={s.ImageContainer}>
      <img 
      alt="Henry-Banner" 
      src={xlMediaQuery ? (vertical_Henry) : (horyzontal_Henry)} 
      width={xlMediaQuery ? "200" : (xsMediaQuery ? "600" : "400")} 
      height={xlMediaQuery ? "1000" : "200"}
      />
    </div>
  </Grid>
  </>) :
  
  (<>
  <Grid item xs={12} sm={9} md={9} lg={9} xl={10.2} >
    <div>
      <Grid container spacing={0} sx={{ml:1}}>
        {currentBooks.length?
        (
        currentBooks?.map((b) => {return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
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
        </Grid>
        )})
        ): 
        (<>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Alert severity="info">There are no matches - Keep Searching!</Alert>
        </Grid>
        </>)
        
        }
      </Grid>
      <div className={s.paginated}>
        <Paginated
        booksPerPage={booksPerPage}
        allBooks={loadBooks.length}
        paginate={paginate}
        actualPage={currentPage}
        />
      </div>
    </div>
  </Grid>
  <Grid item xs={12} sm={3} md={3} lg={3} xl={1.8}>
    <div className={s.ImageContainer}>
      <a href="https://www.soyhenry.com" target="blank">
        <img 
        alt="Henry-Banner" 
        src={xsMediaQuery ? (vertical_Henry) : (horyzontal_Henry)} 
        width={xsMediaQuery ? "200" : "400"} 
        height={xsMediaQuery ? "1000" : "200"}
        />
      </a>
    </div>
  </Grid>
  </>)
  }
  
</Grid>
    
{allBooks.length ? (
<div>
</div>
) : (<Loader />)}
<Footer/>
</React.Fragment>)
};
