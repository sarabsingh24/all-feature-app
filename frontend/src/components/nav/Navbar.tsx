import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {  reset } from '@reducers/auth/authReducer';


type navbarProps = {
  isLogined: boolean;
};

function Navbar({ isLogined }: navbarProps) {
const { isLogedin } = useAppSelector((state) => state.auth);
const dispatch = useAppDispatch();
const navigate = useNavigate();

const logoutHandeler = () => {
  dispatch(reset());
  navigate('/login');
};

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/products">Products</Link>
      {isLogedin && <button onClick={logoutHandeler}>Logout</button>}
      {/* {isLogined && <Link to="/test">Tests</Link>} */}
    </div>
  );
}

export default Navbar;
