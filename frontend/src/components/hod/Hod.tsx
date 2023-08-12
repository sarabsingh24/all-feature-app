import React from 'react';
import {WrapperStyle} from './Hod-style'

const Hod = ({ Wrapper, children }: any) => {
  const ChildComponent = () => {
    return (
      <Wrapper >
       {children}
      </Wrapper>
    );
  };
  return ChildComponent;
};

export default Hod;
