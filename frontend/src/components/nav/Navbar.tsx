import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { resetUser } from '@reducers/auth/authReducer';
import { resetArticle } from '@reducers/articles/articleReductrs';

import {NavbarStyles} from './Navbar-styled'

type navbarProps = {
  isLogined: boolean;
  user: {
    firstName?: string;
    lastName?: string;
    picturePath?:string;
  };
};

function Navbar({ isLogined, user }: navbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandeler = () => {
    
    navigate('/login');
    dispatch(resetUser());
    // dispatch(resetArticle());
  };
console.log(user);
  return (
    <NavbarStyles>
      {isLogined && (
        <span>
          <img src={`http://localhost:5002${user.picturePath}`} alt={user.firstName} />
          Hi, {user.firstName}
        </span>
      )}
      {isLogined && <button onClick={logoutHandeler}>Logout</button>}
    </NavbarStyles>
  );
}

export default Navbar;
