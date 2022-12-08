import React from "react";

export default function Paginated({ booksPerPage, allBooks, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div  key={number}>
            <h5  onClick={() => paginate(number)}>
              {number}
            </h5>
          </div>
        ))}
    </nav>
  );
}
