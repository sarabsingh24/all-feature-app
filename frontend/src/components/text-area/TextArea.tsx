import React from 'react'
import {TextAreaStyled} from './TextArea-styled'

type TextAreaProps = {
  rows: number;
  value: number | string;
  name?: string;
  placeholder?: string;
  handelchange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({
  rows,
  value,
  name,
  placeholder,
  handelchange,
}: TextAreaProps) => {
  return (
    <TextAreaStyled
      rows={rows}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handelchange}
    />
  );
};

export default TextArea