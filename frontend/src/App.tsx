import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {userLognied} from '@reducers/users/usersReducer'



import Dashboard from '@src/pages/dashboard/Dashboard';
import Login from '@src/pages/login/Login';
import Register from '@src/pages/register/Register';
import Products from '@src/pages/products/Products';

import Layout from '@pages/layout/Layout'
import Navbar from '@src/components/nav/Navbar';

import ProtectedRoute from '@utility/protected-route/ProtectedRoute';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import Test from '@src/pages/test/Test';

function App() {
  const { isLogedin, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

useEffect(() => {
  // dispatch(userLognied(user));
 
}, [user]);

  return (
    <React.Fragment>
      <Router>
        <Navbar isLogined={isLogedin} user={user} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={isLogedin ? <Layout /> : <Login />} />
          {/* <Route
          path="/products"
          element={isLogedin ? <Products /> : <Login />}
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute isLogined={isLogedin}>
              <Test />
            </ProtectedRoute>
          }
        ></Route> */}
        </Routes>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
