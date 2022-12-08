import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { getBooksByName } from "../../redux/actions";
export default function SearchBar(){

const dispatch= useDispatch()

const [name,setName]=useState("")
const [reset,setReset]=useState("")


function handlerInput(e){
    e.preventDefault()
    setName(e.target.value)
    //  dispatch(getBooksByName(name))
    //  setReset("")
}
function handlerSumbit(e){
    e.preventDefault()
    dispatch(getBooksByName(name))
 setName("")
}

console.log(name);


return(
    <div>
      <div>

        
      <input  type="text"  onChange={e=>handlerInput(e)} 
       
        placeholder="Buscar..." value={name}
      />
        <button  onClick={e=>{handlerSumbit(e)}} type="submit">Buscar</button>
      </div>
    </div>
)

} 
