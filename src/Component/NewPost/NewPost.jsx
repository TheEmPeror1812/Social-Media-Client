import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { createNewPost } from "../../Actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./NewPost.css";
import { loaduser } from "../../Actions/user";

function NewPost() {
  const [image, setImage] = useState(null);
  const [caption, setcaption] = useState("");
  const { error, message } = useSelector((state) => state.myPosts);
  const {message:newPostMessage,error:newPostError,loading:newPostloading} = useSelector((state) => state.newPost);

  const alert = useAlert();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onloadend = (e) => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  useEffect(() => {
    if(newPostError) {
      alert.error(newPostError);
      dispatch({ type: "clearErrors" });
    }

    if(newPostMessage) {
      alert.success(newPostMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, message, error, alert,newPostMessage,newPostError]);

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loaduser());
  };

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">New Post</Typography>

        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setcaption(e.target.value)}
        />
        <Button disabled={newPostloading} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}

export default NewPost;
