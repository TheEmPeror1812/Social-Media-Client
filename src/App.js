import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Component/Header/Header";
import Login from "./Component/Header/Login/Login";
import Account from "./Component/Account/Account";
import { loaduser } from "./Actions/user";
import Home from "./Component/Home/Home";
import NewPost from "./Component/NewPost/NewPost";
import Register from "./Component/Register/Register";
import UpdateProfile from "./Component/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Component/UpdatePassword/UpdatePassword";
import UserProfile from "./Component/UserProfile/UserProfile";
import Search from "./Component/Seacrh/Search";
import NotFound from "./Component/NotFound/NotFound";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loaduser())
  }, [dispatch])
  
  const {isAuthenticated} = useSelector((state) => state.user)

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login/>} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Login/>} />
        <Route path="/newpost" element={isAuthenticated ? <NewPost /> : <Login/>} />
        <Route path="/register" element={isAuthenticated ? <Account /> : <Register/>} />
        <Route path="/update/profile" element={isAuthenticated ? <UpdateProfile /> : <Login/>} />
        <Route path="/update/password" element={isAuthenticated ? <UpdatePassword /> : <Login/>} />
        <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login/>} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Login/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
