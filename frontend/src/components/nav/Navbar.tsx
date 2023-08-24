import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { resetUser, logoutUser } from '@reducers/auth/authReducer';
import { resetArticle } from '@reducers/articles/articleReductrs';

import { NavbarStyles, LogoArea ,OtherLinks} from './Navbar-styled';

type navbarProps = {
  isLogedIn: boolean;
  user?: {
    firstName?: string;
    lastName?: string;
    picturePath?: string;
  } | null;
  
};

function Navbar({ isLogedIn, user }: navbarProps) {
const { userProfile } = useAppSelector(state=> state.auth);

const userPic = userProfile?.picturePath || user?.picturePath; 
const ind = userPic?.indexOf('assets');
const trimedPath = userPic?.slice(ind);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandeler = () => {
    dispatch(resetUser());
    dispatch(logoutUser()); 
    navigate('/login');
    
    
    // dispatch(resetArticle());
  };


  return (
    <NavbarStyles>
      {isLogedIn && (
        <LogoArea>
          <img
            src={`http://localhost:3000/${trimedPath}`}
            alt={user?.firstName}
            className="img-style"
          />
          <span className="name-sty">
            {' '}
            Hi, {userProfile.firstName || user?.firstName}
          </span>
        </LogoArea>
      )}

      {isLogedIn && (
        <OtherLinks>
          <Link to="/" className="link-style">
            Home
          </Link>

          <Link to="/myposts" state ={user} className="link-style">
            My Posts
          </Link>
          <Link to="/profile" state={user} className="link-style">
            Profile
          </Link>
          <span onClick={logoutHandeler} className="link-style">
            Logout
          </span>
        </OtherLinks>
      )}
    </NavbarStyles>
  );
}

export default Navbar;
