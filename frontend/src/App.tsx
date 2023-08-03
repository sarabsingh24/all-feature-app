import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from '@src/pages/dashboard/Dashboard';
import Login from '@src/pages/login/Login';
import Register from '@src/pages/register/Register';
import Products from '@src/pages/products/Products';
import Navbar from '@src/components/nav/Navbar';

import ProtectedRoute from '@utility/protected-route/ProtectedRoute';
import { useAppSelector } from '@src/reducers/hooks';
import Test from '@src/pages/test/Test';

function App() {
  const [isLogined, setIsLogined] = useState(false);
  const { isSuccess } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (isSuccess) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, [isSuccess]);

  return (
    <Router>
      <Navbar isLogined={isLogined} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/test"
          element={
            <ProtectedRoute isLogined={isLogined}>
              <Test />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
