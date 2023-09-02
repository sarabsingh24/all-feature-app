import React, { useState, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//reducers
import { useAppSelector } from '@src/reducers/hooks';

import Login from '@src/pages/login/Login';
import Register from '@src/pages/register/Register';
import Profile from '@src/pages/profile/Profile';
import MyPost from '@src/pages/posts/MyPost';
import Posts from '@pages/posts/Posts';
import Navbar from '@src/components/nav/Navbar';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [isLogedIn, setIsLogedIn] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  useLayoutEffect(() => {
    // const IsUserExist = Object.values(user).filter((item) => item !== '');
    if ( user.email !== '') {
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
          <Route path="/" element={isLogedIn ? <Posts /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
};

export default App;
