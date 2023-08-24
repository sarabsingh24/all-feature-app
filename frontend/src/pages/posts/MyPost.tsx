import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { useLocation } from 'react-router-dom';

import {
  article,
  deleteArticle,
  resetArticle,
} from '@src/reducers/articles/articleReductrs';
import { toast } from 'react-toastify';
import Layout from '@pages/layout/Layout';

import PostsList from './PostsList';

const formFields = {
  title: '',
  description: '',
  likes: {},
  firstName: '',
  lastName: '',
  location: '',
  userPicturePath: '',
  picturePath: '',
  comments: [],
};

function Posts() {
  const [textArea, setTextArea] = useState(formFields);
  const [editStatus, setEditStatus] = useState(false);
  const [id, setID] = useState('');

  const { articles, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.articles
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = location.state;

  const myPost = articles.filter(({ userId }) => userId === user._id);

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
      {myPost.length > 0 ? (
        myPost.map((item: any) => {
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
