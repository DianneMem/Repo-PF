
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { createUser } from '../../redux/actions'
import { Google } from '@mui/icons-material';
import { Typography } from '@mui/material';

export const Register = () => {

	const [errors, setError] = useState({});
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(createUser());
	}, [dispatch]);


	const [input, setInputs] = useState({
		username: "",
		email: "",
		password: "",
		confirmation: "",
	});
console.log(input);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (!input.username || !input.email || !input.password) {

			alert("Cannot have empty elements!!")

		} else {
			dispatch(createUser(input))

			setInputs({
				username: '',
				email: '',
				password: '',
				confirmation: '',

			});
		}
	};

	const handleUser = (e) => {
		setInputs({ ...input, [e.target.name]: e.target.value })
		setError(validate({...input, [e.target.name]: e.target.value}))
		console.log(input);
	};


	function validate(input) {
		const errors = {}
		let RegEXP = /[`ª!@#$%^*-+\=\[\]{};"\\|,<>\/~]/;
		if (!input.username) {
			errors.username = 'Username required'
		} else if (RegEXP.test(input.username)) {
			errors.username = "Special characters are not accepted"
		}
		if (!input.email) {
			errors.email = 'E-mail required'
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
			errors.email = 'Invalid e-mail address';
		} else if (users.find(e => e.email.toLowerCase() === input.email.toLowerCase())) {
			errors.email = 'This mail is already registered';
		}
		if (!input.password) {
			errors.password = 'Password required'
		}
		if (input.password !== input.confirmation) {
			errors.confirmation = "Passwords must match"
		}
		return errors
	}

	

	return (

		<section className="section-reg ">
			<div className="container">
				<div className="row justify-content-center  fixed-top" >
					<div className="col-md-6 text-center mt-4">
						<h2 className="heading-section">Register</h2>
					</div>
				</div>

				<div className="row justify-content-center  ">
					<div className="col-md-12 col-lg-10">
						<div className="wrap d-flex justify-content-center">

							<div className="login-wrap p-4 p-lg-5 div-log col-lg-5
							">
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
										<input onChange={(e => handleUser(e))} type="text" className="form-control" name="username" placeholder="Username" required />
										{errors.username && <h5>{errors.username}</h5>}
									</div>
									<div className="form-group mb-3">
										<label className="label" for="email">E-mail</label>
										<input onChange={(e => handleUser(e))} type="email" className="form-control" name='email' placeholder="E-mail" required />
									</div>
									<div className="form-group mb-3">
										<label className="label" for="password">Password</label>
										<input onChange={(e => handleUser(e))} type="password" className="form-control" name='password' placeholder="Password" required />
									</div>
									<div className="form-group mb-3">
										<label className="confirm" for="passconfirm">Password Confirmation</label>
										<input onChange={(e => handleUser(e))} type="password" className="form-control" name='confirmation' placeholder="Confirm your password" required />
									</div>

									<div className="form-group mb-3">

									</div>


									<div className='row justify-content-center '>
									<div className="form-group text-center">
										<button onSubmit={(e) => handleSubmit(e)} type="submit" className="btnl btnl-primary col-lg-10">Sign In</button>
									</div>


									{/* enlace para google */}
									<div className="mt-1  text-center ">
										<a  href='http://localhost:3001/google/signup' className="order-md-last btn btn-outline-danger col-lg-10">
										<Google />
                  <Typography sx={{ml: 1}}>Google</Typography>
										</a>
									</div>
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

