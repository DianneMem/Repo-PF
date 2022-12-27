import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createCustomer, createUser, getAllUsers } from "../../redux/actions";
import { Google, LockClockOutlined, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [errors, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
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
      alert("Cannot have empty elements!!");
    } else {
      dispatch(
        createCustomer({ username: input.username, email: input.email })
      );
      dispatch(
        createUser({
          username: input.username,
          password: input.password,
          email: input.email,
        })
      );

      setInputs({
        username: "",
        email: "",
        password: "",
        confirmation: "",
      });
      navigate("/confirmacount");
    }
  };

  const handleUser = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
    console.log(input);
  };

  function validate(input) {
    const errors = {};
    let RegEXP = /[`ª!@#$%^*-+\=\[\]{};"\\|,<>\/~]/;
    if (!input.username) {
      errors.username = "Username required";
    } else if (RegEXP.test(input.username)) {
      errors.username = "Special characters are not accepted";
    }
    if (!input.email) {
      errors.email = "E-mail required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
      errors.email = "Invalid e-mail address";
    } else if (
      users.find((e) => e.email.toLowerCase() === input.email.toLowerCase())
    ) {
      errors.email = "This mail is already registered";
    }
    if (!input.password) {
      errors.password = "Password required";
    }
    if (input.password !== input.confirmation) {
      errors.confirmation = "Passwords must match";
    }
    return errors;
  }

  return (
    <div>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", padding: 6 }}
        className="texts-login"
      >
        <Container component="main" maxWidth="md" sx={{ bgcolor: "#ebebeb", borderRadius: 2 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h2" sx={{color: "#013a63", mb: 1}}>
              FlyBooks
            </Typography>
            <Avatar sx={{ m: 1, bgcolor: "#ff6700" }}>
              <LockClockOutlined />
            </Avatar>
            
            <Typography component="h1" variant="h5" sx={{ color: "#013a63" }}>
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e)=> handleSubmit(e)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.username && <p className="danger-p">{errors.username}</p>}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.email && <p className="danger-p">{errors.email}</p>}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.password && <p className="danger-p">{errors.password}</p>}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmation"
                    label=" Repeat Password"
                    type="password"
                    id="confirmation"
                    autoComplete="new-password"
                    onChange={(e) => handleUser(e)}
                  />
                </Grid>
                {errors.confirmation && <p className="danger-p">{errors.confirmation}</p>}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, color: "#013a63", border:1}}
                endIcon={<Send />}
              >
                Sign Up
              </Button>

              <Button 
              variant="outlined" 
              fullWidth 
              sx={{ mb: 2, border: 1, color: "#013a63" }}
              href="http://localhost:3001/google/signup"
              >
                <Google />
                <Typography sx={{ ml: 1, color: "#013a63" }}>Google</Typography>
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item sx={{opacity: 0.7}}>
                  <Link to={"/login"} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </div>
  );
};
