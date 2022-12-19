import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RecoverPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    password: "",
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleUser = (e) => {};

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
                <div className=" p-4 p-lg-5 div-log">
                  <div className="d-flex">
                    <div className="text-center">
                      <h3 className="mb-4">Recover Password</h3>
                    </div>
                  </div>
                  <form
                    action="#"
                    className="signin-form"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    {/* correo */}
                    <div className="form-group mb-3">
                      <label className="label">E-mail</label>
                      <input
                        onChange={(e) => handleUser(e)}
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="E-mail"
                        required
                      />
                    </div>

                    <div className="form-group">
                      {/* boton para enviar token */}
                      <button
                        type="submit"
                        className="form-control btnl btnl-primary button-lo px-3"
                      >
                        Send Instructions
                      </button>
                    </div>
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
