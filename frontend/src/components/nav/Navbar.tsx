import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { resetUser, logoutUser } from '@reducers/auth/authReducer';
import { resetArticle } from '@reducers/articles/articleReductrs';

import {NavbarStyles} from './Navbar-styled'

type navbarProps = {
  isLogedIn: boolean;
  user?: {
    firstName?: string;
    lastName?: string;
    picturePath?: string;
  } | null;
  
};

function Navbar({ isLogedIn, user }: navbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandeler = () => {
    dispatch(resetUser());
    dispatch(logoutUser());
    navigate('/login');
    
    
    // dispatch(resetArticle());
  };

  useEffect(() => {}, []);

  return (
    <NavbarStyles>
      {isLogedIn && (
        <span>
          {/* <img
            src={`http://localhost:3000${user.picturePath}`}
            alt={user.firstName}
          /> */}
          Hi, {user?.firstName}
        </span>
      )}
      {isLogedIn && <button onClick={logoutHandeler}>Logout</button>}
    </NavbarStyles>
  );
}

export default Navbar;
