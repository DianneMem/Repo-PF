import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addStorage,
  clearFavorites,
  deleteFavoriteItemById,
  getUsersDetail,
} from "../../redux/actions";
import Loader from "../loader/Loader";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const MySwal = withReactContent(Swal);
  let getCart = JSON.parse(localStorage.getItem("cart"));
  const dispatch = useDispatch();
  const usersDetail = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let favscurrent = JSON.parse(localStorage.getItem("favs"));

  useEffect(() => {
    let session = JSON.parse(localStorage.getItem("session"));
    let id = session[0].id;
    dispatch(getUsersDetail(id));
  }, [dispatch,loading]);

  console.log("detail", usersDetail);

  // Loading SetTimeOut
  
  const changeState = () => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  };
  if (loading === false) {
    changeState();
    return <Loader />;
  } else {
    if (usersDetail.length === 0) {
      let session = JSON.parse(localStorage.getItem("session"));
      let id = session[0].id;
      dispatch(getUsersDetail(id));
      setLoading(false);
      // alert("No books found");
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
  function handlerDeleteAll(e, message) {
    e.preventDefault();
    let session = JSON.parse(localStorage.getItem("session"));
    if (session) {
      dispatch(clearFavorites(session[0].id));
      localStorage.setItem("favs", "[]");
      MySwal.fire("You delete all Favorites Items!", message, "info");

      navigate("/");
    } else {
      localStorage.setItem("favs", "[]");
      MySwal.fire("You delete all Favorites Items!", message, "info");
      navigate("/");
    }
  }
  function deleteItem(el) {
    let favCurrent = JSON.parse(localStorage.getItem("favs"));
    let result = favCurrent.filter((e) => e._id !== el);
    let session = JSON.parse(localStorage.getItem("session"));
    dispatch(deleteFavoriteItemById(session[0].id, el));
    localStorage.setItem("favs", JSON.stringify(result));
    navigate("/favorites");
  }

  console.log(usersDetail);
  return (
    <div>
        <button onClick={(e) => handlerDeleteAll(e)}>
        Delete all Favorites Items
      </button>
     
        <div>
    
      {favscurrent.length? favscurrent.map((elm) => (
        <div>
          <button onClick={() => deleteItem(elm._id)}>
            x
          </button>
          <img src={elm.image} alt="asd" />
          <h5>{elm._id}</h5>
          <h5>{elm.title}</h5>
          <h5>{elm.price}</h5>
          <h5>{elm.author}</h5>
          <button onClick={(e) => cartHandler(elm)}>add Cart</button>
        </div>
      )):
        <h1>You havent  items in favorites</h1>
      }
      </div>
    </div>
  );
}
