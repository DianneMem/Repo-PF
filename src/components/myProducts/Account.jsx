import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getUsersDetail } from "../../redux/actions";
import DashUserForm from "../dashUserForm/dashUserForm";
import DefaultUser from "../../assets/user1.png"

import Card from '@mui/material/Card';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AspectRatio from '@mui/joy/AspectRatio';


export default function Account() {
  
  // Global State
  const dispatch = useDispatch();
  const session = JSON.parse(localStorage.getItem("session"));
  useEffect(() => {
    dispatch(getUsersDetail(session[0].id));
  }, [dispatch]);
  
  const user = useSelector((state) => state.userDetail[0]);

  
  // Functions
  
  
  return(<React.Fragment>
  <h1>This is Account</h1>
  <p>Saldo | Notificaciones</p>
  
  {user?
  (<Card sx={{ maxWidth: 345 }} key={user.username}>
      <AspectRatio objectFit="contain">
        <img src={DefaultUser} alt="user"/>
      </AspectRatio>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>
      <CardActions>
        <DashUserForm user={user}/>
      </CardActions>
  </Card>) 
  :(<></>)}
  
  </React.Fragment>)
};
