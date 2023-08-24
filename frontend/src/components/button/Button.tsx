import React from 'react';
import { ButtonStyle } from './Button-style';

type InputButtonProps = {
  btnType: any;
  btnName: string;
  btnFunction?: () => void;
  disabled?:boolean;
};

const InputButton = ({
  btnType,
  btnName,
  btnFunction,
  disabled,
}: InputButtonProps) => {
  return (
    <ButtonStyle type={btnType} onClick={btnFunction} disabled={disabled ? true: false}>
      {btnName}
    </ButtonStyle>
  );
};

export default InputButton;
