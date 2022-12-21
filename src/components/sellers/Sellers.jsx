import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/actions";

export default function Sellers () {

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  },[dispatch])

  console.log(users)

  return(
    <div>
      <ol>
          {
            users.map((elm,ind) => {
              return <li>{elm.username}</li> 
            })
          }
      </ol>
    </div>
  )
}
