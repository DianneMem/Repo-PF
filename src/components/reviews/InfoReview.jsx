import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, modifyPost } from "../../redux/actions";
import { getUsersDetail } from "../../redux/actions";

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





export default function InfoReview({buyerId, productId}){

 
  const allUsers = useSelector((state) => state.users);
  let Review = {sellerName:'Name', score:' - / 5', comment:'comment'};
  
  if(allUsers.length){
    const user = allUsers.find(user => user._id === buyerId);
    const userReviews = user.myreviews;
    const review1 = userReviews.find(rev => rev.productId === productId);
    if(review1) Review = review1
  
  };

  // Local States
  const [open, setOpen] = useState(false);
  
  // Functions
  function handleOpen(){
    setOpen(true);
  };
  function handleClose(){
    setOpen(false);
  };
  
  
  return (<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined" size="small">Review</Button>
  <Dialog open={open} onClose={handleClose} maxWidth="md">
    <DialogTitle>Review of {Review.sellerName}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Score: {Review.score} / 5
      </DialogContentText>
      <DialogContentText>
        Comment: {Review.comment}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
  </React.Fragment>)
};
