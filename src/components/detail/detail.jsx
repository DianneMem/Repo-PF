import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { addFavorites, addStorage, addToCart, getBooksDetails, getAllUsers } from "../../redux/actions";
import defaultImage from "../../assets/bookDefault.png";
import s from './detail.module.css'
import fav from '../../assets/fav.png';
import cart from "../../assets/cart.png";
import ebook from "../../assets/ebook.png";
import physical from "../../assets/physical.png";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Detail() {
  let detail = useSelector((state) => state.detailsBook);
  let allbooks = useSelector((state) => state.books);

  const theme = useSelector((state) => state.darkMode)
  let users = useSelector((state) => state.users);


  let { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal)
  console.log(localStorage);
  let getCart = JSON.parse(localStorage.getItem("cart"));

  const user = users.find((elm) => {
    return elm._id === detail.sellerId
  });
  
  const score =user &&  user.reviews.map((elm) => {
    return elm.score
  });


  useEffect(() => {
    dispatch(getBooksDetails(_id));
    dispatch(getAllUsers())
  }, [dispatch, _id]);



  function backHandler(e) {
    e.preventDefault();
    navigate("/");
  }
  function paymentHandler(e) {
    e.preventDefault();
    navigate(`/payment/${_id}`);
  }

  function cartHandler(e, message) {
    e.preventDefault();
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]")
    }
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id
      if (getCart.filter(e => e._id === detail._id).length < 1) {
        getCart.push(detail)
        localStorage.setItem("cart", JSON.stringify(getCart))
        dispatch(addStorage(id, detail))
      }
      else {
        MySwal.fire('You already have this product in the cart!', message, 'error');
      }

      console.log(getCart);

    } else {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", "[]")
      }
      let getCart = JSON.parse(localStorage.getItem("cart"));
      getCart.filter(e => e._id === detail._id).length < 1 ? getCart.push(detail) : MySwal.fire('You already have this product in the cart!', message, 'error');
      localStorage.setItem("cart", JSON.stringify(getCart))
    }

  }

  function favsHandler(e, message) {
    e.preventDefault();
    if (!localStorage.getItem("favs")) {
      localStorage.setItem("favs", "[]")
    }
    let favs = JSON.parse(localStorage.getItem("favs"));
    let userId = JSON.parse(localStorage.getItem("session"));
    if (userId) {
      let id = userId[0].id
      if (favs.filter(e => e._id === detail._id).length < 1) {
        favs.push(detail)
        localStorage.setItem("favs", JSON.stringify(favs))
        dispatch(addFavorites(id, detail))
      }
      else {
        MySwal.fire('You already have this product in the cart!', message, 'error')
      }

    } else {
      if (!localStorage.getItem("favs")) {
        localStorage.setItem("favs", "[]")

      }

      MySwal.fire('Please register to be able to add products to Favorites!', message, 'info')
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

  

  return (<>
    <Header noSearch={true} />
    <div className={s.contain} style={{ "background-color": theme && "#212529", "color": theme && "white" }}>
      

      {/* 
      <button onClick={(e) => backHandler(e)} className="buttonBack">
        ←
      </button> */}
      <div className={s.left}>
        <div className="imgCard">
          <img
            src={detail.image ? detail.image : defaultImage}
            alt="Book"
            width={"100%"}
          />
        </div>

      </div>

      <div className={s.right}>
        <div className={s.cardDetail}>
          <h1 className={s.titleDetail}>{detail.title}</h1>
          <div className={s.detail}>
            <p class="">
              Author: <span className={s.detail}>{detail.author}</span>{" "}
            </p>
            <p class={s.detail}>
              Category:{" "}
              <span className={s.detail}> {detail.categorie}</span>
            </p>
            <p className={s.detail} >
              Editorial:{" "}
              <span className={s.detail}>{detail.editorial}</span>{" "}
            </p>
            {detail.saga && (
              <p class="">
                Saga: <span className={s.detail}>{detail.saga}</span>{" "}
              </p>
            )}
            <p>
              Lenguage: <span className={s.detail}>{detail.language}</span>
            </p>
            <p>
              Gender:{" "}
              <span className={s.detail}>
                {detail.gender?.map((e) => {
                  return <span>{e}</span>;
                })}{" "}
              </span>{" "}
            </p>
            <p>
              Year: <span className={s.detail}> {detail.year}</span>{" "}
            </p>
            <p>
              State: <span className={s.detail}> {detail.state}</span>{" "}
            </p>
          </div>

          {/* <p>Available: {detail.available}</p> */}
          <div className={s.typebook}>
            {detail.typebook && detail.typebook == "virtual" ? (
              <>
                <img src={ebook} alt="imageD" />
                <p>ebook</p>
              </>
            ) : (
              <>
                <img src={physical} alt="imageDet" />
                <p>Physical book</p>
              </>
            )}
          </div>

          <h3>$ {detail.price}</h3>

          <div className={s.buttonsIcons}>
            <button onClick={(e) => favsHandler(e)}>
              <img className={s.icon} src={fav} alt="" />
            </button>

            <button onClick={(e) => cartHandler(e)} className="button">
              <img className={s.icon} src={cart} alt="" />
            </button>
          </div>

          <button onClick={(e) => paymentHandler(e)} className={s.button}>
            Buy
          </button>
        </div>

      </div>
      <div className={s.detailSeller}>

        <h2>Seller: {detail.seller}</h2>
        {
          score.length ?
            <h3>Score:{Math.round(score.reduce((acc, curr) => acc + curr) / score.length)}</h3> :
            <h3>No score yet</h3>
        }
        <h4>Reviews</h4>
        {
          !user.reviews.length ?
            <p>There are no reviews</p> :
            user.reviews.map((elm) => {
              return (
                <p>{elm.sellerId}: {elm.comment}</p>
              )
            })
        }
      </div>

    </div>
    </>
  );
}
