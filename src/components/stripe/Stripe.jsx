import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addPurchases, deleteStorageItemById, getBooksDetails } from "../../redux/actions";
import "./Stripe.css";
import Header from "../header/Header";
import Swal from 'sweetalert2'
import jwt from "jwt-decode";
import withReactContent from 'sweetalert2-react-content'
const stripePromise = loadStripe(
  "pk_test_51MEajtLJTt31yzza3WX4jHFtoY2chXZjf8JxyJdYL1PC4zY3WNWc3sf0a0kHToBWpf1PORn5UL5jZAnebi7EVczd00zXYRDt4g"
);

const CheckoutForm = () => {
  const detailState = useSelector((state) => state.detailsBook);
  let { _id } = useParams();
  console.log(_id);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailsBooks = useSelector((state) => state.detailsBook)
  const MySwal = withReactContent(Swal)
  useEffect(() => {
    dispatch(getBooksDetails(_id));
  }, [dispatch, _id]);

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
      console.log(stripeId[0]);
    
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: Math.ceil(detailState.price) * 100,
            created: detailState._id,
            customer:stripeId[0].id
          }
        );
        
        let cartCurrent = JSON.parse(localStorage.getItem("cart"));
        if(cartCurrent){
          let result=cartCurrent.filter(e=>e._id!==_id )
          localStorage.setItem("cart", JSON.stringify(result))
        }
        let session = JSON.parse(localStorage.getItem("session"));
        dispatch(deleteStorageItemById(session[0].id,_id))
        console.log("sessionId",session[0].id)
        dispatch(addPurchases(session[0].id,{username: detailsBooks.seller, productId: _id, sellerId: detailsBooks.sellerId}))
        console.log(data);
        elements.getElement(CardElement).clear();
        MySwal.fire("Thank You for your purchase!", message, "success");
        navigate("/")
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  } else{
    MySwal.fire('Please register to be able to buy products!', message, 'info')
    navigate("/login");
  }
  };

  return (
  <div >
      <Header noSearch={true} />
    <form className="stripeContainer" onSubmit={handleSubmit}>
  
      <div className="productCard">
      <div>{detailState.title}</div>
        <img className="paymentImg" src={detailState.image} alt="img" />
        <div>{detailState._id}</div>
        <div>{detailState.author}</div>
        <div>{detailState.editorial}</div>
        <div>{detailState.language}</div>
        <div>{detailState.year}</div>
        <div>{detailState.state}</div>
        <div>seller: {detailState.seller}</div>
      </div>
     <div className="productCard">
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
  
    </form>
    </div>
  );
};

function Stripe() {
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

export default Stripe;
