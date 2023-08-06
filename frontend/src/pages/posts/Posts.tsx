import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { article } from '@src/reducers/articles/articleReductrs';

import PostsList from './PostsList';

function Posts() {
  const { articles, isLoading } = useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();
   
  useEffect(()=>{
  dispatch(article());
  },[])

  if (isLoading) {
    return <small>Loading......</small>;
  }
  return (
    <div>
      <h3>Posts</h3>
      {articles.length > 0 ? (
        articles.map((post) => {
          const { _id } = post;
          return <PostsList article={post} key={_id} />;
        })
      ) : (
        <div>not found</div>
      )}
    </div>
  );
}

export default Posts;
