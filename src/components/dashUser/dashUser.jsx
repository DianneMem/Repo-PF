import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers, disableUser, deleteUser, modifyUser } from "../../redux/actions";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import s from "./dashUser.module.css";



export default function DashUser({user}) {
  // Call Global States
  const dispatch = useDispatch();

  // Global States

  // Local States
  let [userInput, setUserInput] = useState({});
  const [advice, setAdvice] = useState('');


  // Functions
  async function disableUserById(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(disableUser(itemId));
    dispatch(getAllUsers());
  };
  
  async function deleteUserById(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(deleteUser(itemId));
    dispatch(getAllUsers());
  };
  
  async function changePermissions(e, user){
    e.preventDefault();
    let info = {[e.target.name]: e.target.value};
    await dispatch(modifyUser(user._id, info));
    dispatch(getAllUsers());
  };
  
  function handleUserInputs(e){
    e.preventDefault();
    setUserInput({
    ...userInput,
    [e.target.name]: e.target.value
    })
    setAdvice('Press Modify to change properties');
  };

  async function modifyUserById(e, user){
    e.preventDefault();
    let inputSend = userInput;
    
    for (const property in inputSend) {
      if(inputSend[property] === ''){
        inputSend[property] = user[property]
      };
    }
    
    await dispatch(modifyUser(user._id, inputSend));
    dispatch(getAllUsers());
    setAdvice('');
  };
  
  
  return (
    <form className={s.user} onSubmit={(e) => modifyUserById(e,user)}>
      <p>id: {user._id}</p>
      <div>
        <p>role: {user.role}</p>
        {user.role === 'user' ? 
        (<button name='role' value='admin' className="btn btn-outline-warning" onClick={(e)=>changePermissions(e,user)}>admin</button>) : 
        (<button name='role' value='user' className="btn btn-outline-warning" onClick={(e)=>changePermissions(e,user)}>user</button>)}
      </div>
      <div>
        <p>username: {user.username}</p>
        <input type='text' name='username' onChange={(e)=>handleUserInputs(e)} placeholder={'New username'}/>
      </div>
      <div>
        <p>email: {user.email}</p>
        <input type='email' name='email' onChange={(e)=>handleUserInputs(e)} placeholder={'New email'}/>
      </div>
      <div>
        <button type='submit' className="btn btn-outline-primary">Modify</button>
        <p>{advice}</p>
      </div>
      {user.available? (<p>Available: Yes</p>) : (<p>Available: No</p>)}
      {user.available ? 
      (<button value={user._id} className="btn btn-outline-warning" onClick={e => disableUserById(e)}>
        Disable
      </button>) : 
      (<button value={user._id}className="btn btn-outline-warning" onClick={e => disableUserById(e)}>
        Enable
      </button>)}
      <button value={user._id} className="btn btn-outline-danger" onClick={e => deleteUserById(e)}>
        Delete
      </button>
  </form>
  )
};
