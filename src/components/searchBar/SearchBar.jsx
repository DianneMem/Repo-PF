import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  getBooksByName  } from "../../redux/actions";
import {AiOutlineSearch} from "react-icons/ai"
import "./SearchBar.css"
export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [reset, setReset] = useState("");

  function handlerInput(e) {
    e.preventDefault();
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
    <div>
      <div className="searchBarBody">
        <input
        className="searchBarInput"
          type="text"
          onChange={(e) => handlerInput(e)}
          placeholder="Buscar..."
          value={name}
        />
        <button className="buttonSearchBar"
          onClick={(e) => {
            handlerSumbit(e);
          }}
          type="submit"
        >
          <AiOutlineSearch/>
        </button>
      </div>
    </div>
  );
}
