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
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from "@mui/material";




export default function InfoBuy({Purchase}){

const dispatch = useDispatch();
useEffect(() => {
  dispatch(getUsersDetail(Purchase.sellerId));
}, [dispatch]);

const allBooks = useSelector((state) => state.allbooks);
const product = Purchase.productId;
const book = allBooks.find(u => u._id === product);

const seller = useSelector((state) => state.userDetail[0]);
const allScores = seller && seller.reviews.map((elm) => {return elm.score});
let score = "No Score";

if (allScores.length){
  score = Math.round(allScores.reduce((acc, curr) => acc + curr) / allScores.length)
};

const day = Purchase.date.split(' ');

const buyer = Purchase.buyerId;
const [open, setOpen] = useState(false);

// Functions
function handleOpen(){
  setOpen(true);
};

function handleClose(){
  setOpen(false);
};



return (<React.Fragment>
  <Button onClick={e => handleOpen(e)} variant="outlined" size="small">Info</Button>
  <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'sm'}>
    <DialogTitle>{Purchase.title}</DialogTitle>
    <DialogContent>
      <DialogContentText variant={'h6'}>
        Buy
      </DialogContentText>
      <DialogContentText >
        Author: {book.author}
      </DialogContentText>
      <DialogContentText>
        Editorial: {book.editorial}
      </DialogContentText>
      <DialogContentText>
        Language: {book.language}
      </DialogContentText>
      <DialogContentText>
        State: {book.state} - {book.typebook}
      </DialogContentText>
      <DialogContentText variant={'h6'}>
        Seller
      </DialogContentText>
      <DialogContentText>
          User: {Purchase.sellerName} - Score: {score}
      </DialogContentText>
      <DialogContentText>
        Contact: {seller.email ? (seller.email) : ('')}
      </DialogContentText>
      <DialogContentText>
        {`Date of purchase: ${day[0]}`}
      </DialogContentText>
      <DialogContentText>
        {`Ammount: ${Purchase.amount}`}
      </DialogContentText>   
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
      <Button>Report</Button>
      <Button>Mark as received</Button>
    </DialogActions>
  </Dialog>
  </React.Fragment>)
  };
