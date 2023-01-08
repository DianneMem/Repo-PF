import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsersDetail } from "../../redux/actions";
import PasswordForm from "./PasswordForm";
import DefaultUser from "../../assets/user1.png"

import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Box } from '@mui/material';


export default function Account() {
  
  // Global State
  const dispatch = useDispatch();
  const session = JSON.parse(localStorage.getItem("session"));
  useEffect(() => {
    dispatch(getUsersDetail(session[0].id));
  }, [dispatch]);
  
  const user = useSelector((state) => state.userDetail[0]);
  let role ='';
  if(user && user.role === 'admin') role = 'Admin';

  
  
  // Functions
  
  
  return(<React.Fragment>
  <h1>This is Account</h1>
  <p>Balance: ${user && Math.ceil(user.balance) + '.00'} | Notificaciones</p>
  
  {user?
  (<Card sx={{ maxWidth: 345 }} key={user.username}>
      <Box sx={{pt:3, pl:15}}>
        <Avatar sx={{ bgcolor: "#2196f3", width: 70, height: 70}}>{user.username[0].toUpperCase()}</Avatar>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {user.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {user.phone}
        </Typography>
      </CardContent>
      <CardActions>
          <PasswordForm user={user}/>
          <Typography variant="body1" color="#4caf50" sx={{ml:20}}>
            {role}
          </Typography>
      </CardActions>
  </Card>) 
  :(<></>)}
  
  </React.Fragment>)
};
