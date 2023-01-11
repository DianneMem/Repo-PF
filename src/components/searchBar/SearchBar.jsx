import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByName, searchBooks } from "../../redux/actions";
import { AiOutlineSearch } from "react-icons/ai"
import s from './SearchBar.module.css'
import Search from "@mui/icons-material/Search";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { Button } from "@mui/material";


export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [reset, setReset] = useState("");
  const [search, setSearch] = useState();



  function handlerSumbit(e) {
    e.preventDefault();
    dispatch(getBooksByName(name));
    setReset("")
    setName("");
  }

  console.log(name);
  const search_books = (e) => {
    let search = e.target.value;
    dispatch(searchBooks(search))
    setSearch(search);
  }


  return (
    <div className={s.container}>
      <input
        className={s.searchBarInput}
        type="text"
        onChange={(e) => search_books(e)}
        placeholder="Search..."
   
      />

      <AiOutlineSearch className={s.iconSearch} onClick={(e) => handlerSumbit(e)}/>
    </div>

  );
}
