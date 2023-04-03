import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteAccount, getMyPosts, loginUser, logoutUser } from "../../Actions/user";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import "./Account.css";
import { Link } from "react-router-dom";
import User from "../User/User";

function Account() {
  const dispatch = useDispatch();
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { error: likeError, message } = useSelector((state) => state.like);
  const {
    message: newPostMessage,
    error: newPostError,
    loading: deleteLoading,
  } = useSelector((state) => state.newPost);

  const [followersToggle, setfollowersToggle] = useState(false);
  const [followingToggle, setfollowingToggle] = useState(false);

  const alert = useAlert();

  const logoutHandler = async () => {
    await dispatch(logoutUser());
    alert.success("Logout Successfull");
  };

  const deleteProfileHandler = async () => {
    await dispatch(DeleteAccount());
    dispatch(loginUser())
  };

  useEffect(() => {
    dispatch(getMyPosts());

    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (newPostError) {
      alert.error(newPostError);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(newPostMessage);
      dispatch({ type: "clearMessage" });
    }

    if (newPostMessage) {
      alert.success(newPostMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [
    dispatch,
    alert,
    error,
    likeError,
    message,
    newPostError,
    newPostMessage,
  ]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h6">{user.name}</Typography>
        <div>
          <button onClick={() => setfollowersToggle(!followersToggle)}>
            <Typography>Followers</Typography>
          </button>
          <Typography>{user.followers.length}</Typography>
        </div>

        <div>
          <button onClick={() => setfollowingToggle(!followingToggle)}>
            <Typography>Following</Typography>
          </button>
          <Typography>{user.following.length}</Typography>
        </div>

        <div>
          <Typography>Post</Typography>
          <Typography>{user.posts.length}</Typography>
        </div>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>
        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          disabled={deleteLoading}
          onClick={deleteProfileHandler}
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
        >
          Delete My Profile
        </Button>

        <Dialog
          open={followersToggle}
          onClose={() => setfollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((followers) => (
                <User
                  key={followers._id}
                  userId={followers._id}
                  name={followers.name}
                  avatar={followers.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You have no followers Yet
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setfollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((following) => (
                <User
                  key={following._id}
                  userId={following._id}
                  name={following.name}
                  avatar={following.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax" }}>
                You are not following anyone Yet
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default Account;
