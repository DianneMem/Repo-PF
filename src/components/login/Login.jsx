import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

export const Login = () => {
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
                  <form action="#" className="signin-form">
                    {/* correo */}
                    <div className="form-group mb-3">
                      <label className="label" for="email">
                        E-mail
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="E-mail"
                        required
                      />
                    </div>
                    {/* contraseña */}
                    <div className="form-group mb-3">
                      <label className="label" for="password">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      {/* boton para iniciar sesion */}
                      <button
                        type="submit"
                        className="form-control btnl btnl-primary button-lo px-3"
                      >
                        Login
                      </button>
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
