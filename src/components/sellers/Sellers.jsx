import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReview,getUsersDetail } from "../../redux/actions";
import Loader from "../loader/Loader";

export default function Sellers() {
  const dispatch = useDispatch();
  const usersDetail = useSelector((state) => state.userDetail);
  

  let session = JSON.parse(localStorage.getItem("session"));
  const id = session[0].id;

  const [input, setInput] = useState({
    sellerId: session[0].username,
    comment: "",
    score: 0,
  });

  function handlerChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    dispatch(getUsersDetail(id));
  }, [dispatch]);

  console.log("detail", usersDetail);

console.log(input)
  function handlerSubmit(e,id) {
    e.preventDefault();
    dispatch(addReview(id,input));
    setInput({
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
    }, 2000);
  };
  if (loading === false) {
    changeState();
    return <Loader />;
  } else {
    if (usersDetail.length === 0) {
      dispatch(getUsersDetail(id));
      setLoading(false);
      // alert("No books found");
    }
  }

  return (
    <div>
      <ul>
        {usersDetail[0].purchases.map((elm) => (
          <div>
            <form onSubmit={(e) => handlerSubmit(e,elm.sellerId)}>
            <h5>USER: {elm.username}</h5>
            <h5>PRODUCT: {elm.productId}</h5>
            <h5>sellerId: {elm.sellerId}</h5>
              <label>
                Add Your Review:
              </label>
              <textarea onChange={(e) => handlerChange(e)} name="comment" cols="30" rows="10"></textarea>
              <label>
                Score:
              </label>
              <input type="number" name="score" onChange={(e) => handlerChange(e)} />
              <button type="submit" >Submit</button>
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
}
