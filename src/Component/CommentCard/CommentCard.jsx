import React from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Delete } from "@mui/icons-material";

import "./CommentCard.css";
import { deleteCommentOnPost } from "../../Actions/post";
import { getFollowingPosts, getMyPosts } from "../../Actions/user";

function CommentCard({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const deleteCommentHandler = async(e) => {
        dispatch(deleteCommentOnPost(postId,commentId))

        if (isAccount) {
            dispatch(getMyPosts())
          } else {
            await dispatch(getFollowingPosts());
          }
    }

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography>{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
}

export default CommentCard;
