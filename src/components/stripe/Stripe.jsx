import React, { useState,useEffect } from "react";
import {  useSelector,useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { getBooksDetails } from '../../redux/actions';
const stripePromise = loadStripe("pk_test_51MEajtLJTt31yzza3WX4jHFtoY2chXZjf8JxyJdYL1PC4zY3WNWc3sf0a0kHToBWpf1PORn5UL5jZAnebi7EVczd00zXYRDt4g");

const CheckoutForm = () => {
  const detailState= useSelector(state=>state.detailsBook)
  let { _id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getBooksDetails(_id));
  }, [dispatch, _id]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount:Math.ceil( detailState.price)*100,
            created: detailState._id
          }
        );
        
        console.log(data);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };


  return (
    <form  onSubmit={handleSubmit}>
      {/* Product Information */}
      <div>{detailState.title}</div>
      <div>{detailState.image}</div>
      <div>{detailState._id}</div>
      <div>{detailState.author}</div>
      <div>{detailState.editorial}</div>
      <div>{detailState.language}</div>
      <div>{detailState.year}</div>
      <div>{detailState.state}</div>
      {/* User Card Input */}
      <div >
        <CardElement />
      </div>

      <button disabled={!stripe} >
        {loading ? (
          <div  role="status">
            <span>Loading...</span>
          </div>
        ) : (
          "Buy"
        )}
      </button>
    </form>
  );
};

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <div >
        <div >
          <div>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Stripe;
