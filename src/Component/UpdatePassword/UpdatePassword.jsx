import React, { useState,useEffect } from "react";
import "./UpdatePassword.css"
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Updatepassword } from "../../Actions/user";

function UpdatePassword() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(newPassword,oldPassword)
    dispatch(Updatepassword(oldPassword,newPassword))
  };

  const {error,loading,message} = useSelector(state => state.newPost)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, error, message]);

  return (
    <div className="updatePassword">
      <form className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Update Your Password
        </Typography>
    
        <input
          type="password"
          placeholder="Enter Your Old Password"
          required
          value={oldPassword}
          className="updatePasswordInputs"
          onChange={(e) => {
            setoldPassword(e.target.value);
          }}
        />

        <input
          type="password"
          placeholder="Enter Your New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => {
            setnewPassword(e.target.value);
          }}
        />
        <Button disabled={loading} type="submit">Update Password</Button>
      </form>
    </div>
  );
}

export default UpdatePassword;