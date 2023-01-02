import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers, disableUser, deleteUser, modifyUser } from "../../redux/actions";

import defaultImage from '../../assets/bookDefault.png';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';





export default function DashUserForm({user}){

//Global States
const dispatch = useDispatch();
const users = useSelector((state) => state.users);


// Local States
const [input, setInput] = useState({
username: user.username,
email: user.email
});
const [error, setError] = useState({});
const [open, setOpen] = useState(false);

if(open) console.log(input);
if(open) console.log('formError', error);


// Functions
function handleOpen(){
  setInput({
    username: user.username,
    email: user.email,
    role: user.role,
    password: '',
    confirm: ''
  });
  setError({});
  setOpen(true);
};

function handleClose(){
  setInput({
    username: user.username,
    email: user.email,
    role: user.role,
    password: '',
    confirm: ''
  });
  setError({});
  setOpen(false);
};

function inputChange(e){
  e.preventDefault();
  setInput({
  ...input,
  [e.target.name]: e.target.value
  });
  setError(validate({
    ...input,
    [e.target.name]: e.target.value
  }));
};

async function modifyUserById(){
  const infoToSend = {
    username: input.username,
    email: input.email,
    role: input.role,
    password: input.password
  };

  for (const property in infoToSend) {
    if(infoToSend[property] === ''){
      infoToSend[property] = user[property]
    };
  };
  
  await dispatch(modifyUser(user._id, infoToSend));
  handleClose();
  dispatch(getAllUsers());
};

function validate(input){
  const error = {};
  let RegEXP = /[`ª!@#$%^*-+\=\[\]{};"\\|,<>\/~]/;
  if (!input.username) {
    error.username = "Username required";
  } else if (RegEXP.test(input.username)) {
    error.username = "Special characters are not accepted";
  }
  if (!input.email) {
    error.email = "E-mail required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
    error.email = "Invalid e-mail address";
  } else if (
    users.find((e) => e.email.toLowerCase() === input.email.toLowerCase())
  ) {
    error.email = "This mail is already registered";
  }
  if (!input.password) {
    error.password = "Password required";
  } else if (input.password.length < 5){
    error.password = "Password minimum 5 characters";
  }
  if (input.password !== input.confirmation) {
    error.confirmation = "Passwords must match";
  }
  if (!input.role) {
    error.role = "Select role";
  }
  return error;
};



return(
<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined">Modify</Button>
  <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Edit User</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Fill the fields you want to change
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="username"
        name='username'
        label="Username"
        type="text"
        fullWidth
        variant="outlined"
        value={input.username}
        onChange={(e)=>inputChange(e)}
      />
      {/* {error.username && <p className="danger-p">{error.username}</p>} */}
      <TextField
        autoFocus
        margin="dense"
        id="email"
        name='email'
        label="Email"
        type="text"
        fullWidth
        variant="outlined"
        value={input.email}
        onChange={(e)=>inputChange(e)}
      />
      {/* {error.email && <p className="danger-p">{error.email}</p>} */}
      <TextField
        autoFocus
        margin="dense"
        id="password"
        name='password'
        label="New Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.password}
        onChange={(e)=>inputChange(e)}
      />
      {/* {error.password && <p className="danger-p">{error.password}</p>} */}
      <TextField
        autoFocus
        margin="dense"
        id="confirmation"
        name='confirmation'
        label="Repeat Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.confirm}
        onChange={(e)=>inputChange(e)}
      />
      {/* {error.confirmation && <p className="danger-p">{error.confirmation}</p>} */}
      <FormControl >
        <FormLabel id="radio-group-label-1">Type</FormLabel>
        <RadioGroup
        row
        aria-labelledby="radio-group-label-1"
        name="typebook"
        onChange={e=>inputChange(e)}
        value={input.role}
        >
          <FormControlLabel name="role" value="admin" control={<Radio />} label="Admin" />
          <FormControlLabel name="role" value="user" control={<Radio />} label="User" />
        </RadioGroup>
      </FormControl>
      {error.role && <p className="danger-p">{error.role}</p>}
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={modifyUserById}>Modify</Button>
        </DialogActions>
    </DialogContent>
  </Dialog>

</React.Fragment>
)};
