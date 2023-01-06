import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllBooks, getAllUsers, disableUser, deleteUser, modifyUser } from "../../redux/actions";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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





export default function PasswordForm({user}){

//Global States
const dispatch = useDispatch();
const navigate = useNavigate();
const MySwal = withReactContent(Swal);
const users = useSelector((state) => state.users);

// Local States
const [input, setInput] = useState({});
const [error, setError] = useState({});
const [open, setOpen] = useState(false);

if(open) console.log(input);
if(open) console.log('formError', error);


// Functions
function handleOpen(){
  setInput({
    oldPassword: '',
    password: '',
    confirm: ''
  });
  setError({});
  setOpen(true);
};

function handleClose(){
  setInput({
    oldPassword: '',
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

function modifyUserById(){
  
  const hashPassword = bcrypt.hashSync(input.password, 10);
  
  const infoToSend = {
    password: hashPassword
  };
  
  dispatch(modifyUser(user._id, infoToSend));
  dispatch(getAllUsers());
  localStorage.clear();
  navigate("/");
  handleClose();
  return MySwal.fire("Your Password has been changed", "Logout please" , "success");
};

function validate(input){
  const error = {};
  let RegEXP = /[`ª!@#$%^*-+\=\[\]{};"\\|,<>\/~]/;
  if (!input.password) {
    error.password = "Password required";
  } else if (input.password.length < 6){
    error.password = "Password minimum 6 characters";
  }
  if (input.password !== input.confirm) {
    error.confirmation = "Passwords must match";
  }
  if(!bcrypt.compareSync(input.oldPassword, user.password)){
    error.oldPassword = "Incorrect Password";
  }
  return error;
}


return(
<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined">Modify</Button>
  <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Edit password</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Password minimum 6 characters
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="oldPassword"
        name='oldPassword'
        label="Old Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.oldPassword}
        onChange={(e)=>inputChange(e)}
      />
      {error.oldPassword && <p className="danger-p">{error.oldPassword}</p>}
      <TextField
        autoFocus
        margin="dense"
        id="password"
        name='password'
        label="New Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.newPassword}
        onChange={(e)=>inputChange(e)}
      />
      {error.password && <p className="danger-p">{error.password}</p>}
      <TextField
        autoFocus
        margin="dense"
        id="confirm"
        name='confirm'
        label="Repeat Password"
        type="password"
        fullWidth
        variant="outlined"
        value={input.confirm}
        onChange={(e)=>inputChange(e)}
      />
      {error.confirmation && <p className="danger-p">{error.confirmation}</p>}
      <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={modifyUserById}>Modify</Button>
        </DialogActions>
    </DialogContent>
  </Dialog>

</React.Fragment>
)};
