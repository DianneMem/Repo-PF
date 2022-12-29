import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBooksByName } from "../../redux/actions";
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

  function handlerInput(e) {
    setName(e.target.value);
  }

  function handlerSumbit(e) {
    e.preventDefault();
    dispatch(getBooksByName(name));
    setReset("")
    setName("");
  }

  console.log(name);



  return (
    <div className={s.container}>
      <input
        className={s.searchBarInput}
        type="text"
        onChange={(e) => handlerInput(e)}
        placeholder="Buscar..."
        value={name}
      />

      <AiOutlineSearch className={s.iconSearch} onClick={(e) => handlerSumbit(e)}/>
    </div>

  );
}
