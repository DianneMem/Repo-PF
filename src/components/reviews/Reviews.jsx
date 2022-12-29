import React, { useState } from "react";
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
import { Button, Grid, Box } from "@mui/material";
import TextField from "@mui/joy/TextField";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

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

  const [input, setInput] = useState({
    productId: "",
    sellerId: session[0].username,
    comment: "",
    score: 0,
  });

  function setButton(productId) {
    setOpen(true);
    setInput({ ...input, productId: productId });
  }

  function handlerChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    dispatch(getUsersDetail(id));
    dispatch(getAllUsers());
  }, [dispatch]);

  function handlerSubmit(id) {
    dispatch(createReview(id, input));
    dispatch(myReview(usersDetail[0]._id, input));
    setInput({
      productId: "",
      sellerId: session[0].username,
      comment: "",
      score: 0,
    });
  }

  // Loading SetTimeOut
  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };
  if (loading === false) {
    changeState();
    return <Loader />;
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
  console.log("input", input);

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
              width: 250,
              height: 400,
              border: "solid",
              borderColor: "#ff6700",
              borderRadius: 6,
              marginBottom: 6,
            }}
          >
            <Typography align="center" variant="h5" color="initial">
              {elm.title}
            </Typography>
            <Box
              sx={{
                width: 150,
              }}
            >
              <img  src={elm.image} />
            </Box>
            {handlerSellerId(elm.sellerId).includes(elm.productId) === false ? (
              <Grid>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setButton(elm.productId)}
                >
                  <Add />
                  Add Review
                </Button>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                      maxWidth: 500,
                      borderRadius: "md",
                      p: 3,
                      boxShadow: "lg",
                    }}
                  >
                    <Typography
                      id="basic-modal-dialog-title"
                      component="h2"
                      level="inherit"
                      fontSize="1.25em"
                      mb="0.25em"
                    >
                      Your Review
                    </Typography>
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
                          label="comment"
                          name="comment"
                          onChange={(e) => handlerChange(e)}
                          autoFocus
                          required
                        />
                        <TextField
                          label="score"
                          name="score"
                          onChange={(e) => handlerChange(e)}
                          required
                        />
                        <Button type="submit">Submit</Button>
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
