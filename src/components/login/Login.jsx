import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {

	
  return (

    <section className="ftco-section">
		<div className="container">

			<div className="row justify-content-center mg-2" >
				<div className="col-md-6 text-center mt-5">
					<h2 className="heading-section">FlyBooks</h2>
				</div>
			</div>

			<div className="row justify-content-center ">
				<div className="col-md-12 col-lg-10">
					<div className="wrap d-flex justify-content-center">
						<div className="text-wrap p-4 p-lg-7 text-center d-flex align-items-center order-md-last   border border-success">
							<div className="text w-100">
								<h2>Don't have an account?</h2>
								<Link to="/register" className="btn btn-white btn-outline-white border border-danger">Sign In</Link>
							</div>
			      </div>
						<div className="login-wrap p-4 p-lg-5 border border-dark">
			      	<div className="d-flex">
			      		<div className="w-100">
			      			<h3 className="mb-4">Login</h3>
			      		</div>
								<div className="w-100">
									<p className="social-media d-flex justify-content-end">
										<a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
										<a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
									</p>
								</div>
			      	</div>
							<form action="#" className="signin-form">
								{/* correo */}
			      		<div className="form-group mb-3">
			      			<label className="label" for="email">E-mail</label>
			      			<input type="text" className="form-control" name="email" placeholder="E-mail" required/>
			      		</div>
								{/* contraseña */}
		            <div className="form-group mb-3">
		            	<label className="label" for="password">Password</label>
		              <input type="password" className="form-control" name="password" placeholder="Password" required/>
		            </div>
		            <div className="form-group">
									{/* boton para iniciar sesion */}
		            	<button type="submit" className="form-control btn btn-primary submit px-3">Login</button>
		            </div>
		            <div className="form-group d-md-flex">
		            	
									
		            </div>
		          </form>
		        </div>
		      </div>
				</div>
			</div>
      
		</div>
	</section>

  )
}
