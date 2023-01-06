import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFavorites,
  addStorage,
  getBooksDetails,
  getAllUsers,
} from "../../redux/actions";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AddShoppingCartOutlined,
  Book,
  FavoriteOutlined,
  MenuBookOutlined,
  PaidOutlined,
  StarOutline,
  StyleOutlined,
} from "@mui/icons-material";

export default function Detail() {
  let detail = useSelector((state) => state.detailsBook);
  const theme = useSelector((state) => state.darkMode);
  let users = useSelector((state) => state.users);

  let { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  let getCart = JSON.parse(localStorage.getItem("cart"));

  const user = users.find((elm) => {
    return elm._id === detail.sellerId;
  });
  console.log("usuariooo", user);

  const score =
    user &&
    user.reviews.map((elm) => {
      return elm.score;
    });

  useEffect(() => {
    dispatch(getBooksDetails(_id));
    dispatch(getAllUsers());
  }, [dispatch, _id]);

  function paymentHandler(e) {
    e.preventDefault();
    navigate(`/payment/${_id}`);
  }

  function cartHandler(e, message) {
    e.preventDefault();
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id;
      if (getCart.filter((e) => e._id === detail._id).length < 1) {
        getCart.push(detail);
        localStorage.setItem("cart", JSON.stringify(getCart));
        dispatch(addStorage(id, detail));
      } else {
        MySwal.fire(
          "You already have this product in the cart!",
          message,
          "error"
        );
      }

      console.log(getCart);
    } else {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]");
      }
      let getCart = JSON.parse(localStorage.getItem("cart"));
      getCart.filter((e) => e._id === detail._id).length < 1
        ? getCart.push(detail)
        : MySwal.fire(
            "You already have this product in the cart!",
            message,
            "error"
          );
      localStorage.setItem("cart", JSON.stringify(getCart));
    }
  }

  function favsHandler(e, message) {
    e.preventDefault();
    if (!localStorage.getItem("favs")) {
      localStorage.setItem("favs", "[]");
    }
    let favs = JSON.parse(localStorage.getItem("favs"));
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id;
      if (favs.filter((e) => e._id === detail._id).length < 1) {
        favs.push(detail);
        localStorage.setItem("favs", JSON.stringify(favs));
        dispatch(addFavorites(id, detail));
      } else {
        MySwal.fire(
          "You already have this product in the cart!",
          message,
          "error"
        );
      }
    } else {
      if (!localStorage.getItem("favs")) {
        localStorage.setItem("favs", "[]");
      }

      MySwal.fire(
        "Please register to be able to add products to Favorites!",
        message,
        "info"
      );
      navigate("/login");
    }
  }

  const [loading, setLoading] = useState(false);
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  };
  if (!loading) {
    changeState();
    return <Loader />;
  }

  return (
    <div>
      <Header noSearch={true} />

      <Grid
        container
        component="main"
        sx={{ height: "100vh", paddingTop: 13 }}
        direction="row"
        justifyContent="space-evenly"
      >
        <CssBaseline />

        <Grid item xs sm={2} md={4} sx={{ height: "100%" }}>
          <img width={500} height={645} src={detail.image} alt="" />
        </Grid>

        <Grid
          item
          xs
          sm={8}
          md={4}
          elevation={6}
          sx={{ backgroundColor: theme && "#212529", color: theme && "white" }}
        >
          <Box
            sx={{
              my: 3,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ bgcolor: "#ff6700" }}>
                <Book />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                {detail.title}
              </Typography>
            </Box>

            <Box component="form" noValidate sx={{ mt: 1, ml: 4 }}>
              <p>
                <b>Author: </b>
                <span>{detail.author}</span>{" "}
              </p>
              <p>
                <b>Categorie: </b>
                <span>{detail.categorie}</span>{" "}
              </p>
              <p>
                <b>Editorial: </b>
                <span>{detail.editorial}</span>{" "}
              </p>
              <p>
                <b>Saga: </b>
                <span>{detail.saga}</span>{" "}
              </p>
              <p>
                <b>Language: </b>
                <span>{detail.language}</span>{" "}
              </p>
              <p>
                <b>Gender: </b>
                <span>
                  {detail.gender?.map((e) => {
                    return <span>{e} </span>;
                  })}
                </span>
              </p>
              <p>
                <b>Year: </b>
                <span>{detail.year}</span>{" "}
              </p>
              <p>
                <b>State: </b>
                <span>{detail.state}</span>{" "}
              </p>
              <Grid>
                {detail.typebook && detail.typebook === "virtual" ? (
                  <p>
                    <StyleOutlined /> Ebook
                  </p>
                ) : (
                  <p>
                    <MenuBookOutlined /> Physical book
                  </p>
                )}
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                $ {detail.price}
              </Typography>
              <Button
                startIcon={<PaidOutlined />}
                onClick={(e) => paymentHandler(e)}
                sx={{ color: "white", bgcolor: "green" }}
              >
                Buy
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={<FavoriteOutlined />}
                onClick={(e) => favsHandler(e)}
                sx={{ color: "red" }}
              >
                Add favorites
              </Button>
              <Button
                startIcon={<AddShoppingCartOutlined />}
                onClick={(e) => cartHandler(e)}
                sx={{ color: "#006ba6" }}
              >
                Add Cart
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          xs
          sm={8}
          md={4}
          elevation={6}
          sx={{ backgroundColor: theme && "#212529", color: theme && "white" }}
        >
          <Box
            sx={{
              my: 3,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Box>
              <p>
                <AccountCircleOutlined />
                <b> Seller: </b>
                <span>{detail.seller}</span>{" "}
              </p>
              {score.length ? (
                <p>
                  <StarOutline /> <b>Score: </b>
                  {Math.round(
                    score.reduce((acc, curr) => acc + curr) / score.length
                  )}
                </p>
              ) : (
                <p>
                  <b>No Score Yet</b>
                </p>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold" }}
              >
                Reviews
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              {!user.reviews.length ? (
                <p>There are no reviews</p>
              ) : (
                user.reviews.map((elm) => {
                  const colours = ["orange", "blue", "green", "black", "violet", "yellow", "red"];
                  const random = Math.floor(Math.random() * colours.length);
                  return (
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <Avatar sx={{ bgcolor: colours[random] }}>
                        {elm.buyerUsername.charAt(0).toUpperCase()}
                      </Avatar>
                      <TextField
                        label={elm.buyerUsername +": "+elm.comment}
                        fullWidth
                        sx={{bgcolor: "#ebebeb", mb: 1, border: 0, color: "#000"}}
                        boxShadow={3}
                        disabled
                      />
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
