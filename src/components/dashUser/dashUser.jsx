import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers, disableUser, deleteUser, modifyUser } from "../../redux/actions";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import s from "./dashUser.module.css";
import DashUserForm from "../dashUserForm/dashUserForm";
import Button from '@mui/material/Button';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




export default function DashUser({user}) {
  // Call Global States
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  // Functions
  async function disableUserById(e){
    e.preventDefault();
    let stateAux = user.available ? ("disabled") : ("enabled");
    let itemId = e.target.value;
    await dispatch(disableUser(itemId));
    dispatch(getAllUsers());
    return MySwal.fire(`The user has been ${stateAux}`, "" , "success");
  };
  
  async function deleteUserById(e){
    e.preventDefault();
    let itemId = e.target.value;
    await dispatch(deleteUser(itemId));
    dispatch(getAllUsers());
    return MySwal.fire("The user has been deleted", "" , "success");
  };
  
  
  
  
  return (<React.Fragment>
  {/* <div className={s.user}>
    <p>{user._id}</p>
    <div>
      <p>{user.role}</p>
      {user.role === 'user' ? 
      (<button name='role' value='admin' onClick={(e)=>changePermissions(e,user)}>admin</button>) : 
      (<button name='role' value='user' onClick={(e)=>changePermissions(e,user)}>user</button>)}
    </div>
    <p>{user.username}</p>
    <p>{user.email}</p>
    {user.available? (<CheckOutlinedIcon/>) : (<ClearOutlinedIcon/>)}
    <DashUserForm user={user}/>
    {user.available ? 
    (<Button value={user._id} onClick={e => disableUserById(e)} variant="outlined">Disable</Button>) : 
    (<Button value={user._id} onClick={e => disableUserById(e)} variant="outlined">Enable</Button>)}
    <Button value={user._id} onClick={e => deleteUserById(e)} variant="outlined">Delete</Button>
  </div> */}
    <TableRow
    key={user.username}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">{user._id}</TableCell>
      <TableCell align="left">{user.username}</TableCell>
      <TableCell align="left">{user.email}</TableCell>
      <TableCell align="left">{user.role}</TableCell>
      <TableCell align="center">
        {user.available? (<CheckOutlinedIcon/>) : (<ClearOutlinedIcon/>)}
      </TableCell>
      <TableCell align="center">
        <DashUserForm user={user}/>
        {user.available ? 
        (<Button value={user._id} onClick={e => disableUserById(e)} variant="outlined">Disable</Button>) : 
        (<Button value={user._id} onClick={e => disableUserById(e)} variant="outlined">Enable</Button>)}
        <Button value={user._id} onClick={e => deleteUserById(e)} variant="outlined">Delete</Button>
      </TableCell>
  </TableRow>
</React.Fragment>
)};
