import React, { useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Actions/user";
import { useAlert } from "react-alert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const {error} = useSelector((state) => state.user)
  const {message} = useSelector((state) => state.newPost)

  useEffect(() => {
    if(error){
      alert.error(error)
    dispatch({type:"clearErrors"})
    }

    if(message){
      alert.message(message)
      dispatch({type:"clearMessage"})
    }
    
  },[alert,error,dispatch,message])

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email,password));
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Community
        </Typography>
        <input
          type="email"
          placeholder="Enter Your Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {/* <Link to="forgot/password">
          <Typography>Forgot Password</Typography>
        </Link> */}
        <Button type="submit">Login</Button>
        <Link to="/register">
          <Typography>New User? SignUp Here</Typography>
        </Link>
      </form>
    </div>
  );
}

export default Login;
