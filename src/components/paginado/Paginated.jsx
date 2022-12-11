import React from "react";
import s from './paginated.module.css';

export default function Paginated({ booksPerPage, allBooks, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

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
