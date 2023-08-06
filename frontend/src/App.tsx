import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '@src/pages/dashboard/Dashboard';
import Login from '@src/pages/login/Login';
import Register from '@src/pages/register/Register';
import Products from '@src/pages/products/Products';
import Posts from '@src/pages/posts/Posts';
import Navbar from '@src/components/nav/Navbar';

import ProtectedRoute from '@utility/protected-route/ProtectedRoute';
import { useAppSelector } from '@src/reducers/hooks';
import Test from '@src/pages/test/Test';

function App() {
  const { isLogedin } = useAppSelector((state) => state.auth);

  return (
    <Router>
      <Navbar isLogined={isLogedin} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isLogedin ? <Posts /> : <Login />} />
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
  );
}

export default App;
