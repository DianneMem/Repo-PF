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

export default function Reviews() {
  const dispatch = useDispatch();
  const usersDetail = useSelector((state) => state.userDetail);
  const users = useSelector((state) => state.users);

  let session = JSON.parse(localStorage.getItem("session"));
  const id = session[0].id;

  // const [modal, setModal] = useState(false)

  // const openCloseModal = () => {
  //   setModal(!modal)
  // }

  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(1);

  const [input, setInput] = useState({
    productId: "",
    sellerId: session[0].username,
    comment: "",
    score: start,
  });

  console.log("start",start)
  function setButton(productId) {
    setOpen(true);
    setInput({ ...input, productId: productId });
  }

  function handlerChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value});
  }

 
  useEffect(() => {
    if(loading)return
    dispatch(getUsersDetail(id));
    dispatch(getAllUsers());
  }, [handlerSubmit]);
  
  function handlerSubmit(id) {
    dispatch(createReview(id,{...input, score: start}));
    dispatch(myReview(usersDetail[0]._id,{...input, score: start}));
    setOpen(false);
    setInput({
      productId: "",
      sellerId: session[0].username,
      comment: "",
      score: 0,
    });
    setLoading(false);
  
  }

  console.log("input", input);


  // Loading SetTimeOut
  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };
  if (loading === false) {
    changeState();
    // return <Loader />;
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    if (usersDetail.length === 0) {
      dispatch(getUsersDetail(id));
      setLoading(false);
    }
  }

  function handlerSellerId(sellerId) {
    console.log(users);

    const result = users.find((elm) => {
      return elm._id === sellerId;
    });

    const exist = result.reviews.map((elm) => {
      return elm.productId;
    });

    return exist;
  }
  console.log("usersDetail", usersDetail);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="flex-start"
    >
      {usersDetail[0].purchases.map((elm) => (
        <Grid>
          <Box
            sx={{
              width: 220,
              // height: "450%",
              border: "dotted",
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
              {elm.title.length > 60? elm.title.slice(0,35) + '...': elm.title}
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
            {handlerSellerId(elm.sellerId).includes(elm.productId) === false ? (
              <Grid>
                <Box sx={{ 
                  borderBottomLeftRadius: "17px", 
                  borderBottomRightRadius: "17px" 
                }} 
                  bgcolor="white" 
                  p="10px" 
                  display="flex" 
                  justifyContent="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setButton(elm.productId)}
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
                    <form
                      onSubmit={() => {
                        handlerSubmit(elm.sellerId);
                      }}
                    >
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
                        <Button variant="contained" endIcon={<SendIcon />} type="submit">Send</Button>
                        <Button variant="contained" endIcon={<CancelScheduleSendRoundedIcon />} open={open} onClick={() => setOpen(false)}>Cancel</Button>
                        </Stack>
                      </Stack>
                    </form>
                  </ModalDialog>
                </Modal>
              </Grid>
            ) : (
              <Grid></Grid>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
