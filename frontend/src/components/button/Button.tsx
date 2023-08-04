import React from 'react';
import { ButtonStyle } from './Button-style';

type InputButtonProps = {
  btnType: any;
  btnName: string;
};

const InputButton = ({ btnType, btnName }: InputButtonProps) => {
  return <ButtonStyle type={btnType}>{btnName}</ButtonStyle>;
};

export default InputButton;
