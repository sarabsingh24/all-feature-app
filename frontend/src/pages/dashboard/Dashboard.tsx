import React,{useState} from 'react'
import SecondFun from './SecondFun';
import InputField from '@components/input-field/InputField';


function Dashboard() {
const [value, setValue] = useState('');

const handelchange= (event: React.ChangeEvent<HTMLInputElement>)=> {
let value = event.target.value;
setValue(value);
}

  return (
    <h1>
      Dashboard
      <SecondFun btnHandeler={(event, id) => console.log('ggggg', event, id)} />
      <InputField value={value} handelchange={handelchange} />
    
    </h1>
  );
}

export default Dashboard