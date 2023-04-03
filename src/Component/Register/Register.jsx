import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../Actions/user";
import {useAlert} from "react-alert";
import "./Register.css";

function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [avatar, setavatar] = useState("");

  const dispatch = useDispatch()
  const alert = useAlert()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(name,email,password,avatar))
  };

  const {loading,error} = useSelector((state)=>state.user);

  useEffect(() => {
    if(error){
        alert.error(error)
        dispatch({type:"clearErrors"})
    }
  }, [dispatch,alert,error])
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = (e) => {
      if (Reader.readyState === 2) {
        setavatar(Reader.result);
      }
    };
  };

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Community
        </Typography>
        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        ></Avatar>

        <input required type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          className="registerInputs"
          required
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setname(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Your Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          required
          className="registerInputs"
          value={password}
          onChange={(e) => {
            setpassword(e.target.value);
          }}
        />

        <Link to="/">
          <Typography>Already Signed Up ? Login In Here</Typography>
        </Link>
        <Button disabled={loading} type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default Register;
