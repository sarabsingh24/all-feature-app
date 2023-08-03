import React from 'react';
import { Navigate } from 'react-router-dom';

type protectedProps = {
  children: JSX.Element;
  isLogined: boolean;
};

const ProtectedRoute = ({ children, isLogined }: protectedProps) => {
  if (!isLogined) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
