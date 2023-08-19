import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  article,
  deleteArticle,
  resetArticle,
} from '@src/reducers/articles/articleReductrs';
import { toast } from 'react-toastify';

import PostForm from './PostForm';
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

  const { articles,  isLoading, isSuccess, message } =
    useAppSelector((state) => state.articles);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(article());
  }, []);

  const updateHandeler = useCallback(
    (
      e: React.SyntheticEvent,
      article: {
        firstName: string;
        lastName: string;
        title: string;
        description: string;
        _id: string;
        likes: {};
        location: string;
        userPicturePath: string;
        picturePath: string;
        comments: [];
      }
    ) => {
      setTextArea({
        firstName: article.firstName,
        lastName: article.lastName,
        title: article.title,
        description: article.description,
        likes: { ...article.likes },
        location: '',
        userPicturePath: '',
        picturePath: '',
        comments: [],
      });
      setID(article._id);
      setEditStatus(!editStatus);
      dispatch(resetArticle());
    },
    []
  );

  const deleteHandeler = useCallback((e: React.SyntheticEvent, id: string) => {
    dispatch(deleteArticle(id));
    dispatch(resetArticle());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(resetArticle());
    }
  }, [isSuccess, message]);

  if (isLoading) {
    return <small>Loading......</small>;
  }

  return (
    <div>
      <PostForm
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        textArea={textArea}
        setTextArea={setTextArea}
        formFields={formFields}
        id={id}
      />
     
      {articles.length > 0 ? (
        articles.map((item: any) => {
          const { _id } = item;
          return (
            <PostsList
              article={item}
              key={_id}
              deleteHandeler={deleteHandeler}
              updateHandeler={updateHandeler}
            
            />
          );
        })
      ) : (
        <div>not found</div>
      )}
    </div>
  );
}

export default Posts;
