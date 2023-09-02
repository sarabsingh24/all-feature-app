import React from 'react';
import { useAppSelector, useAppDispatch, } from '@src/reducers/hooks';

import {
  BsPinMapFill,
  BsBriefcaseFill,
  BsEye,
  BsFingerprint,
  BsPersonFillAdd,
} from 'react-icons/bs';
import {
  WrapperStyle,
  CenterStyle,
  SideBoxStyle,
  InfoBoxStyle,
  BoxRow,
} from './Layouts-styled';

const Layout = (WrappedComponent: React.FC<any>) => {
   
  const SubLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
    return (
      <WrapperStyle>
        <SideBoxStyle className="column">
          <InfoBoxStyle>
            <BoxRow>
              <img
                src={`http://localhost:3000/${user?.picturePath?.slice(
                  user?.picturePath?.indexOf('assets')
                )}`}
                alt={user?.firstName}
                className="img-style item"
              />

              <div>{user.firstName}</div>
            </BoxRow>
            <BoxRow>
              <div className="item">
                <BsPinMapFill />
              </div>

              <div>{user.location}</div>
            </BoxRow>
            <BoxRow>
              <div className="item">
                <BsBriefcaseFill />
              </div>

              <div>{user.occupation}</div>
            </BoxRow>
            <BoxRow>
              <div className="item">
                <BsEye />
              </div>
              <div>Viewed</div>

              <div className="last-item">
                <span className="num-box"> {user.viewedProfile}</span>
              </div>
            </BoxRow>
            <BoxRow>
              <div className="item">
                <BsFingerprint />
              </div>
              <div>Liked</div>
              <div className="last-item">
              
                <span className="num-box"> {user.impressions}</span>
              </div>
            </BoxRow>
          </InfoBoxStyle>
        </SideBoxStyle>
        <CenterStyle className="column">
          <WrappedComponent />
        </CenterStyle>
        <SideBoxStyle className="column">
          <InfoBoxStyle>Friends </InfoBoxStyle>
        </SideBoxStyle>
      </WrapperStyle>
    );
  };
  return SubLayout;
};

export default Layout;
