import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  article,
  deleteArticle,
  resetArticle,
} from '@src/reducers/articles/articleReductrs';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import Layout from '@pages/layout/Layout';
import PostForm from './PostForm';
import PostsList from './PostsList';

function Posts() {
  const [editStatus, setEditStatus] = useState(false);
  const [id, setID] = useState('');

  const { articles, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.articles
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(resetArticle());
    }
  }, [isSuccess, message]);

  useEffect(() => {
    dispatch(article());
  }, []);

  if (isLoading) {
    return <small>Loading......</small>;
  }

  return (
    <div>
      <PostForm editStatus={editStatus} setEditStatus={setEditStatus} id={id} />

      {articles.length > 0 ? (
        articles.map((item: any) => {
          const { _id } = item;
          return <PostsList article={item} key={_id} />;
        })
      ) : (
        <div>not found</div>
      )}
    </div>
  );
}

export default Layout(Posts);
