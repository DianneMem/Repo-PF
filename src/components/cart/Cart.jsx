import React, {useEffect, useState } from 'react';

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import Header from "../header/Header";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
const stripePromise = loadStripe(
  "pk_test_51MEajtLJTt31yzza3WX4jHFtoY2chXZjf8JxyJdYL1PC4zY3WNWc3sf0a0kHToBWpf1PORn5UL5jZAnebi7EVczd00zXYRDt4g"
);

const CheckoutForm = () => {

  const stripe = useStripe();
  const elements = useElements();
  const MySwal = withReactContent(Swal)
  const navigate= useNavigate()
  let getCart=JSON.parse(localStorage.getItem("cart"))
let totalAmount={
  amount:getCart? ( getCart.map(e=>e.price)).reduce((sum,item)=> sum +item, 0) :0,
  description:getCart? (getCart.map(e=>e._id).join(" ")):" "
}
console.log(totalAmount);
  useEffect(() => {

  }, []);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/checkout",
          {
            id,
            amount: Math.ceil(totalAmount.amount) * 100,
            created: totalAmount.description,
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

  function handlerDeleteAll(e,message){
    e.preventDefault()
    localStorage.clear()
    MySwal.fire('You delete all Cart Items!', message, 'info');
    navigate("/")
  }

  function successBuy(e,message){

    MySwal.fire('Thank You for your purchase!', message, 'success');
    localStorage.clear()
  }
  


  return (
  <div >
      {/* <Header noSearch={true} /> */}
    <form onSubmit={handleSubmit}>
  
      <div >
        <button onClick={e=>handlerDeleteAll(e)}>Delete all Cart Items</button>
      {getCart? getCart.map(e=> <div><img src={e.image} alt="imgcart" />
<h1>{e.title}</h1>
<h1>{e.price}</h1>
<h1>{e.author}</h1>
<h1>{e.state}</h1>
<h1>{e.Editorial}</h1></div>
):<h1>Your Cart is Empty</h1> }
      </div>
      {totalAmount.amount!==0?      <div >
     <CardElement />
        <button onClick={e=>successBuy(e)} disabled={!stripe}>
          {loading ? (
            <div role="status">
              <span>Loading...</span>
            </div>
          ) : (
            "Buy"
          )}
        </button>
 
     </div>:<div> </div>}

  
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