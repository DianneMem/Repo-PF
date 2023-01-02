import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import defaultImage from "../../assets/bookDefault.png";
import s from "./card.module.css";
import { useDispatch } from "react-redux";
import { addFavorites,addStorage } from "../../redux/actions";

import { Button, Grid, Box, CardMedia, Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Stack from "@mui/joy/Stack";



export default function Card({ id, title, image, type, price, author }) {
  // Only First Mayus
  let getCart = JSON.parse(localStorage.getItem("cart"));
  let titlemod = title.toLowerCase().split(" ").join(" ");
  let mayus = title[0].toUpperCase();
  titlemod = mayus + titlemod.slice(1, titlemod.length);
  title = titlemod;
  let detail = {
    _id: id,
    title: title,
    image: image,
    author: author,
    price: price,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  // Max title characters
  const maxLength1 = 41;
  // if card is more smaller, maxLength1 = 34;
  if (title.length > maxLength1) {
    title = title.slice(0, maxLength1) + "...";
  }

  // Max author words
  const maxLength2 = 22;
  if (author.length > maxLength2) {
    author = author.split(" ").slice(0, 2).join(" ");
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

  function cartHandler(detail, message) {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id;
      console.log(detail);
      getCart.filter((e) => e._id === detail._id).length < 1
        ? getCart.push(detail)
        : MySwal.fire(
            "You already have this product in the cart!",
            message,
            "error"
          );
      localStorage.setItem("cart", JSON.stringify(getCart));
      if (getCart.filter((e) => e._id === detail._id).length < 1) {
        dispatch(addStorage(id, detail));
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
  return (
    <Grid>
        <Box
          sx={{
            width: 180,
            // height: "450%",
            border: "dotted",
            border: 5,
            borderColor: "white",
            borderRadius: 6,
            marginBottom: 2,
            // bgcolor: "#006ba6",
            bgcolor: "#ebebeb",
            boxShadow: "40px 60px 300px #595959",
          }}
        >
          <Link to={`/detail/${id}`} className={s.decOff}>
          <Typography
            align="center"
            variant="h5"
            color="initial"
            marginTop="10px"
            fontSize="100%"
            bgcolor="#006ba6"
            p="10px"
            // className="texts-login2"
            sx={{
              borderTopLeftRadius: "17px",
              borderTopRightRadius: "17px",
              borderBottom: 3,
              borderBottomColor: "white",
              color: "white",
              marginTop: "-px",
            }}
          >
            {title}
            <hr />
            {author}
          </Typography>
          <Box display="flex" justifyContent="center">
                  <CardMedia
                    component="img"
                    sx={{
                      marginTop: 1,
                      marginBottom: 1,
                      width: 130,
                      height: 150,
                      objectFit: "fill",
                      borderRadius: 4,
                      bgcolor: "#ebebeb",
                    }}
                    image={image}
                    alt="img"
                  />
                </Box>
                <Typography
                  align="center"
                  variant="h5"
                  color="initial"
                  marginTop="10px"
                  fontSize="100%"
                  bgcolor="#013a63"
                  p="5px"
                  className="texts-login2"
                  sx={{
                    borderTopLeftRadius: "17px",
                    borderTopRightRadius: "17px",
                    borderBottom: 3,
                    borderBottomColor: "white",
                    color: "black",
                    marginTop: "-px",
                  }}
                >
                  {type}
                  <hr />
                  $ {price}
                </Typography>
      </Link>
                <Stack margin="10px" direction="row" justifyContent="center" spacing={1}>
                      <Button
                        variant="contained"
                        endIcon={<Favorite />}
                        onClick={(e) => favsHandler(e)}
                      >
                       Add
                      </Button>
                      <Button
                        variant="contained" 
                        color="success"
                        endIcon={<AddShoppingCartIcon />}
                        onClick={(e) => cartHandler(detail)}
                      >
                       Add
                      </Button>
                    </Stack>
        </Box>
    </Grid>
  );
}


{/* <button className={s.favorite} onClick={(e) => favsHandler(e)}>
<FiHeart />
</button> */}
