import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createCustomer, findUserStripe, loginUser } from "../../redux/actions";
import jwt from "jwt-decode"

export const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.sessionState)
  const [input, setInputs] = useState({
		password: "",
		username: "",
	});

  console.log(input)


  const handleSubmit =async (e) => {
		e.preventDefault();
    dispatch(createCustomer({username:input.username,email:input.email}))
     dispatch(findUserStripe(input.username))
    dispatch(loginUser({password: input.password,username: input.username, }))
   
    if(!localStorage.getItem("cart")){
      localStorage.setItem("cart","[]")
     
    }

    navigate("/")
  }

  const handleUser = (e) => {
		setInputs({ ...input, [e.target.name]: e.target.value })
		console.log(input);
	};


  return (
    <div>
      <section className="section-log">
        <div>
          <div className="row justify-content-center mg-5">
            <div className="col-md-6 text-center mt-3 mb-5">
              <h2>FlyBooks</h2>
            </div>
          </div>

          <div className="row justify-content-center ">
            <div className="col-md-12 col-lg-10">
              <div className="  d-flex justify-content-center">
                {/* ---- */}
                <div class=" texts-login p-4 p-lg-7 text-center d-flex align-items-center order-md-last   ">
                  <div className="text">
                    <h2>Don't have an account?</h2>
                    <Link
                      to="/register"
                      className="btnl btnl-white btnl-outline-white "
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
                {/* ----- */}
                <div className=" p-4 p-lg-5 div-log">
                  <div className="d-flex">
                    <div>
                      <h3 className="mb-4">Login</h3>
                    </div>
                  </div>
                  <form action="#" className="signin-form" onSubmit={(e) => handleSubmit(e)} >
                    {/* correo */}
                    <div className="form-group mb-3">
                      <label className="label">
                        Username
                      </label>
                      <input
                        onChange={(e) => handleUser(e)}
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="username"
                        required
                      />
                    </div>
                    {/* contraseña */}
                    <div className="form-group mb-3">
                      <label className="label">
                        Password
                      </label>
                      <input
                        onChange={(e) => handleUser(e)}
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        required
                      />
                      <Link to={"/recoverpassword"} >Did you forget your password?</Link>

                    </div>
                    <div className="form-group">
                      {/* boton para iniciar sesion */}
                      <button
                        type="submit"
                        className="form-control btnl btnl-primary button-lo px-3"
                      >
                        Login
                      </button>
                      <a  href='http://localhost:3001/google/signin' className="order-md-last btn btn-outline-danger col-lg-10">Google</a>
                    </div>
                    <div className="form-group d-md-flex"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
