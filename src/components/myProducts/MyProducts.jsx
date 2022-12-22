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
import Header from "../header/Header";

export default function MyProducts() {
  const MySwal = withReactContent(Swal);

  const dispatch = useDispatch();
  const usersDetail = useSelector((state) => state.userDetail);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let session = JSON.parse(localStorage.getItem("session"));
    let id = session[0].id;
    dispatch(getUsersDetail(id));
  }, [dispatch, loading]);



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
  console.log(usersDetail);
  return (
    <div>
      <Header noSearch={true}/>
     <div>
    
    {usersDetail[0]? usersDetail[0].myproducts.map((elm) => (
      <div>
        <img src={elm.image} alt="asd" />
        <h5>{elm._id}</h5>
        <h5>{elm.title}</h5>
        <h5>{elm.price}</h5>
        <h5>{elm.author}</h5>

      </div>
    )):
      <h1>You havent  items in favorites</h1>
    }
    </div>
    </div>
  );
}
