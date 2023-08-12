import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { resetUser } from '@reducers/auth/authReducer';
import { resetArticle } from '@reducers/articles/articleReductrs';

import {NavbarStyles} from './Navbar-styled'

type navbarProps = {
  isLogined: boolean;
  user:{
    firstName?:string,
    lastName?:string,
  }
};

function Navbar({ isLogined, user }: navbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandeler = () => {
    dispatch(resetUser());
    dispatch(resetArticle());
    navigate('/login');
  };

  return (
    <NavbarStyles >
      {isLogined && (
        <span>
          Hi, {user.firstName}
        </span>
      )}
      {isLogined && <button onClick={logoutHandeler}>Logout</button>}
    </NavbarStyles>
  );
}

export default Navbar;
