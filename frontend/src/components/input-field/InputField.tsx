import React from 'react'

type InputFieldProps = {
  value: string;
  handelchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ value, handelchange }: InputFieldProps) => {
  return <input type="text" value={value} onChange={handelchange} />;
};

export default InputField