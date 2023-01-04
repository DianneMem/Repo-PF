import React, { useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  addReview,
  createReview,
  getAllUsers,
  getReviews,
  getUsersDetail,
  myReview,
} from "../../redux/actions";
import InfoBuy from "./InfoBuy";
import Loader from "../loader/Loader";
import { Button, Grid, Box, CardMedia } from "@mui/material";
import TextField from "@mui/joy/TextField";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import Divider from "@mui/material/Divider";

import TextareaAutosize from "@mui/base/TextareaAutosize";
import Rating from "@mui/material/Rating";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InfoReview from "./InfoReview";

export default function Reviews() {


  // Global States
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  let session = JSON.parse(localStorage.getItem("session"));
  const id = session[0].id;
  const usersDetail = users.find(u => u._id === id)


  // Local States
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(1);
  const [input, setInput] = useState({
    productId: "",
    buyerId: session[0].id,
    buyerUsername: session[0].username,
    comment: "",
    score: start,
  });
  
 
  if(open) console.log("input", input);
  
  
  
  // Functions
  
  
  function handleOpen(productId, sellerID, sellerName) {
    setOpen(true);
    setInput({ 
    ...input, 
    productId: productId,
    sellerId: sellerID,
    sellerName: sellerName,
    });
  };
  
  function handleclose(){
    setOpen(false);
    dispatch(getAllUsers());
  };
  
  function handlerChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value});
  };

  async function handlerSubmit(id){
    await dispatch(myReview(usersDetail._id,{...input, score: start}));
    await dispatch(createReview(id,{...input, score: start}));
    setInput({
      productId: "",
      buyerId: session[0].id,
      buyerUsername: session[0].username,
      comment: "",
      score: 0,
    });
    handleclose();
  };
  
 


  //  <Backdrop
  //   sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
  //   open={true}
  //  >
  //    <CircularProgress color="inherit" />
  //  </Backdrop>



  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start"
    >
      {usersDetail?.purchases.map((elm) => (
        <Grid key={elm.productId}>
          <Box
            sx={{
              width: 220,
              // height: "450%",
              border: 5,
              borderColor: "white",
              borderRadius: 6,
              marginBottom: 6,
              bgcolor: "#006ba6",
              boxShadow: "40px 60px 80px  #595959"
            }}
          >
            <Typography
              align="center"
              variant="h5"
              color="initial"
              marginTop="10px"
              fontSize="100%"
              bgcolor="#013a63"
              p="15px"
              className="texts-login2"
              sx={{
                borderTopLeftRadius: "17px",
                borderTopRightRadius: "17px",
                borderBottom:3,
                color: "white",
                marginTop: "-px",
              }}
            >
              {elm.title.length > 45? elm.title.slice(0,45) + '...': elm.title}
            </Typography>
            <Box display="flex" justifyContent="center">
              <CardMedia
                component="img"
                sx={{
                  marginTop: 2,
                  marginBottom: 3,
                  width: 170,
                  height: 200,
                  objectFit: "fill",
                  borderRadius: 4,
                  bgcolor: "#ebebeb",
                }}
                image={elm.image}
                alt="img"
              />
            </Box>
            {usersDetail?.myreviews.some(rev => rev.productId === elm.productId) === false? (
              <Grid>
                <Box sx={{ 
                  borderBottomLeftRadius: "17px", 
                  borderBottomRightRadius: "17px" 
                }} 
                  bgcolor="white" 
                  p="10px" 
                  display="flex" 
                  justifyContent="center">
                  <InfoBuy Purchase={elm}/>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(elm.productId, elm.sellerId, elm.sellerName)}
                  >
                    <Add />
                    Add Review
                  </Button>
                </Box>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                      maxWidth: 500,
                      borderRadius: "md",
                      borderColor: "#013a63",
                      p: 3,
                      boxShadow: "lg",
                    }}
                  >
                    <Typography
                        textAlign="center"
                      id="basic-modal-dialog-title"
                      component="h2"
                      level="inherit"
                      fontSize="1.25em"
                      mb="0.25em"
                    >
                    Review
                    </Typography>
                    <Divider/>

                    <Typography
                      id="basic-modal-dialog-description"
                      mt={0.5}
                      mb={2}
                      textColor="text.tertiary"
                    >
                      Comments about your purchase
                    </Typography>
          
                      <Stack spacing={2}>
                        <TextField
                          label="Comment"
                          name="comment"
                          onChange={(e) => handlerChange(e)}
                          autoFocus
                          required
                        />
                        <Typography component="legend">Score</Typography>
                        <Rating
                          name="simple-controlled"
                          value={start}
                          onChange={(event, newValue) => {
                            setStart(newValue);
                          }}
                        />
                        <Divider/>
                        <Typography
                        textAlign="center"
                      id="basic-modal-dialog-description"
                      mt={0.5}
                      mb={2}
                      textColor="text.tertiary"
                    >
                      Thanks for your rating
                    </Typography>
                        <Stack direction="row" justifyContent="center" spacing={5}>
                        <Button variant="contained" endIcon={<SendIcon />} onClick={() => {
                        handlerSubmit(elm.sellerId);
                      }}>Send</Button>
                        <Button variant="contained" endIcon={<CancelScheduleSendRoundedIcon />} open={open} onClick={() => setOpen(false)}>Cancel</Button>
                        </Stack>
                      </Stack>
                   
                  </ModalDialog>
                </Modal>
              </Grid>
            ) : (
              <Grid>
                <Box sx={{ 
                    borderBottomLeftRadius: "17px", 
                    borderBottomRightRadius: "17px" 
                  }} 
                    bgcolor="white" 
                    p="10px" 
                    display="flex" 
                    justifyContent="center">
                    <InfoBuy Purchase={elm}/>
                    <InfoReview buyerId={elm.buyerId} productId={elm.productId}/>
                  </Box>
                </Grid>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
