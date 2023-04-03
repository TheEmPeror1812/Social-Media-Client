import React, { useState, useEffect } from "react";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  followAndunfollow,
  getUserPosts,
  getUserProfile,
} from "../../Actions/user";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { useParams } from "react-router-dom";
import User from "../User/User";

function UserProfile() {
  const dispatch = useDispatch();
  const {
    loading,
    error: usererror,
    posts,
  } = useSelector((state) => state.userPost);
  const { user, loading: userLoading } = useSelector(
    (state) => state.userProfile
  );
  const { user: me } = useSelector((state) => state.user);
  const { error: likeError, message } = useSelector((state) => state.like);
  const {
    message: newPostMessage,
    error: followError,
    loading: followLoading,
  } = useSelector((state) => state.newPost);

  const params = useParams();

  const [followersToggle, setfollowersToggle] = useState(false);
  const [followingToggle, setfollowingToggle] = useState(false);
  const [following, setfollowing] = useState(false);
  const [myProfile, setmyProfile] = useState(false);

  const followHandler = async() => {
    setfollowing(!following);
    await dispatch(followAndunfollow(user._id));
    dispatch(getUserProfile(params.id));
  };

  const alert = useAlert();

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
    if (me._id === params.id) {
      setmyProfile(true);
    }

    if (followError) {
      alert.error(followError);
      dispatch({ type: "clearErrors" });
    }

    if (usererror) {
      alert.error(usererror);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }

    if (newPostMessage) {
      alert.success(newPostMessage);
      dispatch({ type: "clearMessage" });
    }

    
  }, [
    dispatch,
    alert,
    likeError,
    message,
    newPostMessage,
    me._id,
    params.id,
    usererror,
    followError,
  ]);

  useEffect(() => {
    if(user){
      user.followers.forEach(item => {
        if(item._id === me._id){
          setfollowing(true)
        }
      })
    }else{
      setfollowing(false)
    }
  }, [user,me._id])
  

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
            />
          ))
        ) : (
          <Typography variant="h6">User Have No Posts Yet</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
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

            {myProfile ? null : (
              <Button
                disabled={followLoading}
                onClick={followHandler}
                style={{ background: following ? "red" : "blue" }}
                variant="contained"
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}
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

export default UserProfile;
