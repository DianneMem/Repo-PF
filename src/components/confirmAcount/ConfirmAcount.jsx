import React from 'react'
import { Link } from 'react-router-dom'

export const ConfirmAcount = () => {
  return (
    <section className="section-log">
        <div>
          <div className="row justify-content-center mg-5">
            <div className="col-md-6 text-center  ">
              <h2>FlyBooks</h2>
            </div>
          </div>

          <div className="row justify-content-center ">
            <div className="col-md-12 col-lg-10">
              <div className="  d-flex justify-content-center">
                {/* ---- */}
                <div className=" texts-login p-4 p-lg-7 text-center d-flex align-items-center order-md-last   ">
                  <div className="text">
                    <h2>A link has been sent to your email to verify your account</h2>
                    {/* <Link
                      to="/register"
                      className="btnl btnl-white btnl-outline-white "
                    >
                      Check
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

