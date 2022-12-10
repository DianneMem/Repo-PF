import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorByName, editorialByName, getBooksByName, sagaByName } from "../../redux/actions";
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
    // dispatch(authorByName(name))
    // dispatch(editorialByName(name))
    // dispatch(sagaByName(name))
    setReset("")
    setName("");
  }

  console.log(name);

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => handlerInput(e)}
          placeholder="Buscar..."
          value={name}
        />
        <button
          onClick={(e) => {
            handlerSumbit(e);
          }}
          type="submit"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
