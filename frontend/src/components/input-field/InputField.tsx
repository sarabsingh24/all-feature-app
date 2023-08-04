import React from 'react'
import {InputFientStyle} from './InputField-style' 


type InputFieldProps = {
  type:string,
  value: number | string,
  name?:string,
  placeholder?:string,
  handelchange: (event: React.ChangeEvent<HTMLInputElement>) => void
};

const InputField = ({
  type,
  value,
  name,placeholder,
  handelchange,
}: InputFieldProps) => {
  return (
    <InputFientStyle
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handelchange}
    />
  );
};

export default InputField