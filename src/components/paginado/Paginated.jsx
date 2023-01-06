import React from "react";
import s from './paginated.module.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginated({ booksPerPage, allBooks, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
  <React.Fragment>
    <div className={s.container}>
    <Stack spacing={2}>
      <Pagination count={pageNumbers.length} variant="outlined" onChange={(e,v)=> paginate(v)} color="primary" />
    </Stack>
    </div>
  </React.Fragment>);
};


/* 
//Old Paginated
return (
  <nav className={s.nav}>
    {pageNumbers && pageNumbers.map((number) => (
      <button key={number} onClick={() => paginate(number)} className={s.btn}>
        {number}
      </button>
    ))}
  </nav>
);
} 
*/
