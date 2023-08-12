import React from 'react';
import Posts from '@src/pages/posts/Posts';

import {
  WrapperStyle,
  CenterStyle,
  SideBoxStyle,
  InfoBoxStyle,
} from './Layouts-styled';

const Layout = () => {
  return (
    <WrapperStyle>
      <SideBoxStyle className="column">
        <InfoBoxStyle>ssssss</InfoBoxStyle>
      </SideBoxStyle>
      <CenterStyle className="column">
        <Posts />
      </CenterStyle>
      <SideBoxStyle className="column">
        <InfoBoxStyle>ssssss</InfoBoxStyle>
      </SideBoxStyle>
    </WrapperStyle>
  );
};

export default Layout;
