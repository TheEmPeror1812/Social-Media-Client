import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "./Search.css";
import { getAllUsers } from "../../Actions/user";
import User from "../User/User";

function Search() {
  const [name, setname] = useState("");
  const { users, loading } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Community
        </Typography>

        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
          placeholder="Name"
        />

        <Button disabled={loading} type="submit">
          Search
        </Button>

        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                name={user.name}
                userId={user._id}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </form>
    </div>
  );
}

export default Search;
