import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

//reducer
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  article,
  deleteArticle,
  resetArticle,
} from '@src/reducers/articles/articleReductrs';

//components
import Layout from '@pages/layout/Layout';
import PostForm from './PostForm';
import PostsList from './PostsList';

const Posts: React.FC = () => {
  const [editStatus, setEditStatus] = useState<boolean>(false);

  const [id, setID] = useState<string>('');

  const { articles, isLoading, isSuccess, message } = useAppSelector(
    (state) => state.articles
  );
  const { user } = useAppSelector((state) => state.auth);
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
      <PostForm
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        id={id}
        imagesArray={true}
      />

      {articles.length > 0 ? (
        articles.map((item: any) => {
          const { _id } = item;
          return <PostsList article={item} key={_id} userId={user._id} />;
        })
      ) : (
        <div>not found</div>
      )}
    </div>
  );
};

export default Layout(Posts);
