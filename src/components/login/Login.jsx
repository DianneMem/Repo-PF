import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer, findUserStripe, loginUser } from "../../redux/actions";
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
import { Google, Send } from "@mui/icons-material";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInputs] = useState({
    password: "",
    username: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(findUserStripe(input.username));
    dispatch(loginUser({ password: input.password, username: input.username }));

    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }

    navigate("/");
  };

  const handleUser = (e) => {
    setInputs({ ...input, [e.target.name]: e.target.value });
    console.log(input);
  };

  const handleGoogle = () => {
    dispatch(createCustomer());
    dispatch(findUserStripe());
    dispatch(loginUser());
    navigate("/");
  };

  return (
    <div>
      <Grid container component="main" sx={{ height: "100vh", padding: 6 }} className="texts-login">
      <Container component="main" maxWidth="md" sx={{ bgcolor: "#ebebeb", padding: 3, borderRadius: 2 }}>
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
            <Avatar sx={{ m: 1, bgcolor: "#ff6700" }}></Avatar>
            <Typography component="h1" variant="h5" sx={{color: "#013a63"}}>
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                onChange={(e) => handleUser(e)}
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                
                
              />
              <TextField
                margin="normal"
                onChange={(e) => handleUser(e)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                
              />

              <Button
                type="submit"
                fullWidth
                variant="outlined"
                endIcon={<Send />}
                sx={{ mt: 3, mb: 2, color: "#013a63", border: 1 }}
              >
                Sign In
              </Button>
              <Button 
              variant="outlined" 
              fullWidth
              sx={{  mb: 2, border: 1, color: "#013a63" }}
              onClick={e => handleGoogle(e)}
              >
                <Google />
                <Typography sx={{ ml: 1, color: "#013a63" }}
                 >Google</Typography>
              </Button>

              <Grid container>
                <Grid item xs sx={{opacity: 0.7}}>
                  <Link to="/recoverpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item sx={{opacity: 0.7}}>
                  <Link to="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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
