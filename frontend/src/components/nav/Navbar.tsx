import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { resetUser, logoutUser } from '@reducers/auth/authReducer';

import Notification from '@components/notification/Notification';
import { NavbarStyles, LogoArea, OtherLinks } from './Navbar-styled';

type navbarProps = {
  isLogedIn: boolean;
  user: {
    firstName?: string;
    lastName?: string;
    picturePath?: string;
    notification?: [];
  };
};

const Navbar: React.FC<navbarProps> = ({ isLogedIn, user }) => {
  const [show, setShow] = useState(false);
  const { userProfile } = useAppSelector((state) => state.auth);

  const userPic = userProfile?.picturePath || user?.picturePath;
  const ind = userPic?.indexOf('assets');
  const trimedPath = userPic?.slice(ind);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandeler = () => {
    dispatch(resetUser());
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <NavbarStyles>
      {isLogedIn && (
        <LogoArea>
          {user?.firstName ? (
            <img
              src={`http://localhost:3000/${trimedPath}`}
              alt={user?.firstName}
              className="img-style"
            />
          ) : (
            ''
          )}

          <span className="name-sty">
            Hi, {userProfile.firstName || user?.firstName || 'Guest'}
          </span>
        </LogoArea>
      )}
      {isLogedIn && (
        <OtherLinks>
          <Link to="/" className="link-style">
            Home
          </Link>

          <Link to="/myposts" state={user} className="link-style">
            My Posts
          </Link>

          <Link to="/profile" state={user} className="link-style">
            Profile
          </Link>

          {user?.notification?.length ? (
            <div className="link-style" onClick={() => setShow(true)}>
              Notification
              <span className="notefication">{user?.notification?.length}</span>
            </div>
          ) : (
            ''
          )}

          <span onClick={logoutHandeler} className="link-style">
            Logout
          </span>
        </OtherLinks>
      )}
      {/* <Notification show={show} setShow={setShow} notification={user?.notification} /> */}
    </NavbarStyles>
  );
};

export default Navbar;
