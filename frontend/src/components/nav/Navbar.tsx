import React from 'react';
import { Link } from 'react-router-dom';

type navbarProps = {
  isLogined: boolean;
};

function Navbar({ isLogined }: navbarProps) {
  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/products">Products</Link>
      {isLogined && <Link to="/test">Tests</Link>}
    </div>
  );
}

export default Navbar;
