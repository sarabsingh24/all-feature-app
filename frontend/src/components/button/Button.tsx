import React from 'react';
import { ButtonStyle } from './Button-style';

type InputButtonProps = {
  btnType: any;
  btnName: string;
  btnFunction?:()=> void;
};

const InputButton = ({ btnType, btnName, btnFunction }: InputButtonProps) => {
  return (
    <ButtonStyle type={btnType} onClick={btnFunction}>
      {btnName}
    </ButtonStyle>
  );
};

export default InputButton;
