import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from '@src/pages/login/Login';
import Register from '@src/pages/register/Register';
import Profile from '@src/pages/profile/Profile';
import MyPost from '@src/pages/mypost/MyPost';

import Layout from '@pages/layout/Layout';
import Navbar from '@src/components/nav/Navbar';

import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';



function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const IsUserExist = Object.values(user).filter((item) => item !== '');
    if (IsUserExist.length > 0 ) {
      setIsLogedIn(true);
    } else {
      setIsLogedIn(false);
    }
  }, [user]);

  return (
    <React.Fragment>
      <Router>
        <Navbar isLogedIn={isLogedIn} user={user} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isLogedIn ? <Layout /> : <Login />} />
          {/* <Route path="/profile" element={<Profile user={user} />} /> */}
          <Route path="/myposts" element={<MyPost />} />
          <Route
            path="/profile"
            element={isLogedIn ? <Profile /> : <Login />}
          />
        </Routes>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
