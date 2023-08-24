import React, { FC } from 'react';
import Posts from '@src/pages/posts/Posts';

import {
  WrapperStyle,
  CenterStyle,
  SideBoxStyle,
  InfoBoxStyle,
} from './Layouts-styled';

const Layout = (WrappedComponent: FC<any>) => {
  const subLayout = () => {
    return (
      <WrapperStyle>
        <SideBoxStyle className="column">
          <InfoBoxStyle>ssssss</InfoBoxStyle>
        </SideBoxStyle>
        <CenterStyle className="column">
          <WrappedComponent />
        </CenterStyle>
        <SideBoxStyle className="column">
          <InfoBoxStyle>ssssss</InfoBoxStyle>
        </SideBoxStyle>
      </WrapperStyle>
    );
  };
  return subLayout;
};

export default Layout;
