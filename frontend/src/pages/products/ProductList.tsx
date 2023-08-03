import React, { useState } from 'react';
import InputField from '@components/input-field/InputField';

type ProductListProps = {
  users: {
    id: number;
    name: string;
    username: string;
    email: string;
  }[];
};

const ProductList = ({ users }: ProductListProps) => {
  const [value, setValue] = useState('');
  const [userList, setUserList] = useState(users);

  const handelchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.toLowerCase();
    setValue(value);

    let changeList = users.filter((item) => {
      let name = item.name.toLowerCase();
      let username = item.username.toLowerCase();
      let email = item.email.toLowerCase();
      return (
        name.startsWith(value) ||
        username.startsWith(value) ||
        email.startsWith(value)
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
        <InputField value={value} handelchange={handelchange} />
      </p>

      {userList.length > 0 &&
        userList.map((user) => {
          return (
            <div key={user.id}>
              <span>{user.name}</span> ;=
              <span>{user.username}</span>; =<span>{user.email}</span>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
