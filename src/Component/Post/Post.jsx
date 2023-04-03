import { Avatar, Button, Typography, Dialog } from "@mui/material";
import { Link } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { addCommentOnPost, deletePost, likePost, updatePost } from "../../Actions/post";
import { getFollowingPosts, getMyPosts, loaduser } from "../../Actions/user";
import User from "../User/User";
import CommentCard from "../CommentCard/CommentCard";

function Post({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerImage,
  ownerName,
  ownerId,
  isDelete = false,
  isAccount = false,
}) {
  const [liked, setliked] = useState(false);
  const [likesUser, setlikesUser] = useState(false);
  const [commentValue, setcommentValue] = useState("");
  const [commentToggle, setcommentToggle] = useState("");
  const [captionValue, setcaptionValue] = useState(caption);
  const [captionToggle, setcaptionToggle] = useState("");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setliked(true);
      }
    });
  }, [likes, user._id]);

  const updateCaptionHandler = (e) => {
    e.preventDefault()
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const handlelike = async () => {
    setliked(!liked);
    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      await dispatch(getFollowingPosts());
    }
  };

  const addcommentHandler = async (e) => {
    e.preventDefault();

    await dispatch(addCommentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      await dispatch(getFollowingPosts());
    }
  };

  const deletePostHandler = async(e) => {
    e.preventDefault();
    await dispatch(deletePost(postId))
    dispatch(getMyPosts());
    dispatch(loaduser())
  }

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount ? (
          <Button onClick={() => setcaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        ) : null}
      </div>

      <img src={postImage} alt={"post"} />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{
            height: "3vmax",
            width: "3vmax",
          }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={"700"}>{ownerName}</Typography>
        </Link>

        <Typography
          className="caption"
          fontWeight={100}
          color="rgba(0,0,0,0.582)"
          style={{ alignSelf: "centre" }}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setlikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length}</Typography>
      </button>

      <div className="postFooter">
        <Button onClick={handlelike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>

        <Button onClick={() => setcommentToggle(!commentToggle)}>
          <ChatBubbleOutline />
        </Button>

        <Button onClick={deletePostHandler}>{isDelete ? <DeleteOutline /> : null}</Button>
      </div>
      <Dialog open={likesUser} onClose={() => setlikesUser(!likesUser)}>
        <div className="DialogBox">
          <Typography variant="h4">Liked By</Typography>
          {likes.map((like) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setcommentToggle(!commentToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Comments</Typography>

          <form className="commentForm" onSubmit={addcommentHandler}>
            <input
              type="text"
              value={commentValue}
              onChange={(e) => setcommentValue(e.target.value)}
              placeholder="Enter Your Comment"
            />
            <Button type="submit" variant="contained">
              Add
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((item) => (
              <CommentCard
                key={item.user._id}
                userId={item.user._id}
                name={item.user.name}
                avatar={item.user.avatar.url}
                comment={item.comment}
                commentId={item._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <Typography>No Comments Yet</Typography>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setcaptionToggle(!captionToggle)}
      >
        <div className="DialogBox">
          <Typography variant="h4">Update Caption</Typography>

          <form className="commentForm" onSubmit={updateCaptionHandler}>
            <input
              type="text"
              value={captionValue}
              onChange={(e) => setcaptionValue(e.target.value)}
              placeholder="Enter New Caption"
            />
            <Button type="submit" variant="contained">
              Update
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Post;
