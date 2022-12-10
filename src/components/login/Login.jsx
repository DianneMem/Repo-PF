import React from "react";
import { Link } from "react-router-dom";
export default function Login() {





  return (
    <div>
<h5>Login</h5>
<label>Username or Email</label>
<input placeholder="username or email"/>
<label>Password</label>
<input  placeholder="password"/>
<Link to="/"><button>Login</button></Link>

    </div>
  );
}
