import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "../../redux/actions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const RecoverPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [form, setForm] = useState({
    email: "",
  });

  const handleSubmit = async (e, message) => {
    e.preventDefault();
    dispatch(recoverPassword(form));

    navigate("/login");
    return MySwal.fire(
      "¡Check your email to get your new password!",
      message,
      "success"
    );
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
                <div className=" p-4 p-lg-5 div-log">
                  <div className="d-flex">
                    <div className="text-center">
                      <h3 className="mb-4">Recover Password</h3>
                    </div>
                  </div>
                  <form
                    action="#"
                    id="form"
                    className="signin-form"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    {/* correo */}
                    <div className="form-group mb-3">
                      <label className="label">E-mail</label>
                      <input
                        onChange={(e) => handleChange(e)}
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
