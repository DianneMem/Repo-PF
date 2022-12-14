import React from 'react'

export const Register = () => {
  
	const handleSubmit = (e) => {
        e.preventDefault();
        if (!newUser.username || !newUser.email || !newUser.password) {

            alert("Cannot have empty elements!!")

        } else {
            dispatch(actions.createUser(newUser))

            setNewUser({
                username: '',
                email: '',
                password: '',
              
            });
        }
    };

	
  return (

    <section className="ftco-section">
		<div className="container">

			<div className="row justify-content-center mg-2" >
				<div className="col-md-6 text-center mt-5">
					<h2 className="heading-section">Register</h2>
				</div>
			</div>

			<div className="row justify-content-center ">
				<div className="col-md-12 col-lg-10">
					<div className="wrap d-flex justify-content-center">
						
						<div className="login-wrap p-4 p-lg-5 border border-dark">
			      	<div className="d-flex">
			      		<div className="w-100">
			      			<h3 className="mb-4">Sign In</h3>
			      		</div>
								<div className="w-100">
									<p className="social-media d-flex justify-content-end">
										<a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-facebook"></span></a>
										<a href="#" className="social-icon d-flex align-items-center justify-content-center"><span className="fa fa-twitter"></span></a>
									</p>
								</div>
			      	</div>
							<form action="#" className="signin-form">
                {/* username */}
			      		<div className="form-group mb-3">
			      			<label className="label" for="email">User Name</label>
			      			<input type="text" className="form-control"  name="username" placeholder="Username" required/>
			      		</div>
                <div className="form-group mb-3">
			      			<label className="label" for="email">E-mail</label>
			      			<input type="text" className="form-control" name='email' placeholder="E-mail" required/>
			      		</div>
		            <div className="form-group mb-3">
		            	<label className="label" for="password">Password</label>
		              <input type="password" className="form-control" name='password' placeholder="Password" required/>
		            </div>
		            <div className="form-group">
		            	<button type="submit" className="form-control btn btn-primary submit px-3">Sign In</button>
		            </div>

                {/* enlace para google */}
                <div className="mt-1">
		            	<button type="submit" className="form-control btn btn-primary submit px-3">Google</button>
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
