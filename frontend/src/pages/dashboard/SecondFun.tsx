import React from 'react'


type SecondFunProps = {
  btnHandeler:(event: React.MouseEvent<HTMLButtonElement>, id:number)=> void
};

const SecondFun = ({ btnHandeler }: SecondFunProps) => {
  return (
    <div>
      SecondFun
      <button onClick={(event) => btnHandeler(event, 22)}>click</button>
    </div>
  );
};

export default SecondFun