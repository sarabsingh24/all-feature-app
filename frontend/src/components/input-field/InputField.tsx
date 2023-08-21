import { disable } from 'colors';
import React from 'react'
import {InputFientStyle} from './InputField-style' 


type InputFieldProps = {
  type:string,
  value?: number | string,
  name?:string,
  placeholder?:string,
  disabled?:boolean
  handelchange?: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const InputField = ({
  type,
  value,
  name,
  placeholder,
  handelchange,
  disabled,
}: InputFieldProps) => {
  return (
    <InputFientStyle
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handelchange}
      disabled ={disabled ? true : false}
    />
  );
};

export default InputField