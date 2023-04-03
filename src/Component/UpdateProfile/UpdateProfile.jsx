import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { Updateprofile, loaduser } from "../../Actions/user";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import "./UpdateProfile.css";

function UpdateProfile() {
  const { loading, error, user } = useSelector((state) => state.user);
  const {
    loading: Updateloading,
    error: updateError,
    message,
  } = useSelector((state) => state.newPost);

  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [avatar, setavatar] = useState("");
  const [avatarprev, setavatarprev] = useState(user.avatar.url);

  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(Updateprofile(name, email, avatar));
    dispatch(loaduser())
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.error(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, error, message, updateError]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = (e) => {
      if (Reader.readyState === 2) {
        setavatarprev(Reader.result);
        setavatar(Reader.result);
      }
    };
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Community
        </Typography>
        <Avatar
          src={avatarprev}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        ></Avatar>

        <input
          required
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <input
          type="text"
          className="updateProfileInputs"
          required
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setname(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Your Email"
          className="updateProfileInputs"
          required
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <Button disabled={Updateloading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}

export default UpdateProfile;
