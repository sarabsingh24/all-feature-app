import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { getUsers } from '@src/reducers/users/usersReducer';

import ProductList from './ProductList';



function Products() {
  const { users, isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const getuserList = () => {
    dispatch(getUsers());
  };

  if (isLoading) {
    return <small>Loading......</small>;
  }
  return (
    <div>
      Products
      <button onClick={getuserList}>Submit</button>
      <ProductList users={users} />
    </div>
  );
}

export default Products;
