import React, { useState } from 'react';
import InputField from '@components/input-field/InputField';

type ProductListProps = {
  users: {
    _id: string;
    title: string;
    text: string;
  }[];
};

const ProductList = ({ users }: ProductListProps) => {
  const [value, setValue] = useState('');
  const [userList, setUserList] = useState(users);

  const handelchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toLowerCase();
    setValue(value);

    let changeList = users.filter((item) => {
      let name = item.title.toLowerCase();
      let username = item.text.toLowerCase();
      
      return (
        name.startsWith(value) ||
        username.startsWith(value) 
       
      );
    });

    if (event.target.value === '') {
      setUserList(users);
    } else {
      setUserList(changeList);
    }
  };

  return (
    <div>
      <p>
        <InputField type="text" value={value} handelchange={handelchange} />
      </p>

      {userList.length > 0 &&
        userList.map((user) => {
          return (
            <div key={user._id}>
              <span>{user.title}</span> ;=
              <span>{user.text}</span>; =
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
