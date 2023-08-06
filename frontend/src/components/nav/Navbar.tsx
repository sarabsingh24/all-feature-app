import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { resetUser } from '@reducers/auth/authReducer';
import { resetArticle } from '@reducers/articles/articleReductrs';

type navbarProps = {
  isLogined: boolean;
};

function Navbar({ isLogined }: navbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandeler = () => {
    dispatch(resetUser());
    dispatch(resetArticle());
    navigate('/login');
  };

  return (
    <div >
      {isLogined ? (
        <button onClick={logoutHandeler}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Navbar;
