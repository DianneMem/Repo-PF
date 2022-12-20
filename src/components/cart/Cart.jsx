import React, { useEffect, useState } from "react";

import jwt from "jwt-decode";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Header from "../header/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearStorage, findUserStripe } from "../../redux/actions";
const stripePromise = loadStripe(
  "pk_test_51MEajtLJTt31yzza3WX4jHFtoY2chXZjf8JxyJdYL1PC4zY3WNWc3sf0a0kHToBWpf1PORn5UL5jZAnebi7EVczd00zXYRDt4g"
);

const CheckoutForm = () => {
  const dispatch= useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  let getCart = JSON.parse(localStorage.getItem("cart"));
  let totalAmount = {
    amount: getCart
      ? getCart.map((e) => e.price).reduce((sum, item) => sum + item, 0)
      : 0,
    description: getCart ? getCart.map((e) => e._id).join(" ") : " ",
  };
  console.log(totalAmount);




  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e,message) => {
    e.preventDefault();
    let userId = JSON.parse(localStorage.getItem("session"));
    if(userId){
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);
   
    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      let stripeId = JSON.parse(localStorage.getItem("stripe"));
      console.log(stripeId[0].id);
      try {
        
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: Math.ceil(totalAmount.amount) * 100,
            created: totalAmount.description,
            customer:stripeId[0].id
          }
        );

        console.log(data.customer);
        elements.getElement(CardElement).clear();
        MySwal.fire("Thank You for your purchase!", message, "success");
        localStorage.setItem("cart","[]")
        let session = JSON.parse(localStorage.getItem("session"));
        dispatch(clearStorage(session[0].id))
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      
    }
  } else{
    MySwal.fire('Please register to be able to buy products!', message, 'info')
    navigate("/login");
  }
  
}

  function handlerDeleteAll(e, message) {
    e.preventDefault();
    let session = JSON.parse(localStorage.getItem("session"));
    if(session){
      dispatch(clearStorage(session[0].id))
      localStorage.setItem("cart","[]")
      MySwal.fire("You delete all Cart Items!", message, "info");
      navigate("/");
    } else {
      localStorage.setItem("cart","[]")
      MySwal.fire("You delete all Cart Items!", message, "info");
      navigate("/");
    }
  }


  return (
    <div>
      {/* <Header noSearch={true} /> */}
      <form onSubmit={handleSubmit}>
        <div>
          <button onClick={(e) => handlerDeleteAll(e)}>
            Delete all Cart Items
          </button>
          {getCart ? (
            getCart.map((e) => (
              <div>
                <img src={e.image} alt="imgcart" />
                <h1>{e.title}</h1>
                <h1>{e.price}</h1>
                <h1>{e.author}</h1>
                <h1>{e.state}</h1>
                <h1>{e.Editorial}</h1>
                <h1>{totalAmount.amount}</h1>
              </div>
            ))
          ) : (
            <h1>Your Cart is Empty</h1>
          )}
        </div>
        {totalAmount.amount !== 0 ? (
          <div>
            <CardElement />
            <button disabled={!stripe}>
              {loading ? (
                <div role="status">
                  <span>Loading...</span>
                </div>
              ) : (
                "Buy"
              )}
            </button>
          </div>
        ) : (
          <div> </div>
        )}
      </form>
    </div>
  );
};

function Cart() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <div>
          <div>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Cart;
