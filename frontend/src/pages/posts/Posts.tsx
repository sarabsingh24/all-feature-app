import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  article,
  articlePost,
  updateArticle,
  deleteArticle,
  resetArticle,
  // responseArticles,
} from '@src/reducers/articles/articleReductrs';
import { toast } from 'react-toastify';

import InputField from '@components/input-field/InputField';
import TextArea from '@components/text-area/TextArea';
import InputButton from '@components/button/Button';

import { FormStyled, Flex2Column } from './Post-styled';

import PostsList from './PostsList';

const formFields = {
  title: '',
  text: '',
  likes: 0,
  dislikes: 0,
};

function Posts() {
  const [textArea, setTextArea] = useState(formFields);
  const [editStatus, setEditStatus] = useState(false);
  const [id, setID] = useState('');

  const { articles, articleObj, isLoading, isSuccess, message } =
    useAppSelector((state) => state.articles);
  const dispatch = useAppDispatch();

  const changeHandeler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setTextArea({ ...textArea, [name]: value });
  };

  const testFun = () => {
    
  
  };

  const submitPostHandeler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (textArea.title === '' || textArea.text === '') {
      toast.error('Please fill all the field');
      return;
    }

    if (editStatus) {
      // const filterData: any = articles.map((item: { _id: string }) => {
      //   if (item._id === id) {
      //     return { ...textArea };
      //   }
      //   return item;
      // });

        const data: { id: string; obj: {} } = {
          id: id,
          obj: { ...textArea },
        };

        dispatch(updateArticle(data));
      setEditStatus(false);
    } else {
      dispatch(articlePost(textArea));
    }
    setTextArea({ title: '', text: '', likes: 0, dislikes: 0 });
    dispatch(article());
      dispatch(resetArticle());
    ;
  };

  const updateHandeler = (
    e: React.SyntheticEvent,
    article: {
      title: string;
      text: string;
      _id: string;
      likes: number;
      dislikes: number;
    }
  ) => {
    setTextArea({
      title: article.title,
      text: article.text,
      likes: article.likes,
      dislikes: article.dislikes,
    });
    setID(article._id);
    setEditStatus(true);
    dispatch(resetArticle());
  };

  const deleteHandeler = (e: React.SyntheticEvent, id: string) => {
    dispatch(deleteArticle(id));
    dispatch(resetArticle());
  };

  const responseHandeler = (
    e: React.SyntheticEvent,
    article: {
      title: string;
      text: string;
      _id: string;
      likes: number;
      dislikes: number;
    }
  ) => {
    const attName = e.currentTarget.getAttribute('data-name');

    const data: { id: string; obj: {} } = {
      id: id,
      obj: {},
    };
    if (attName === 'likes') {
      data.obj = { ...article, likes: article.likes + 1 };
      setID(article._id);
    } else {
      data.obj = { ...article, dislikes: article.dislikes + 1 };
      setID(article._id);
    }

    

    dispatch(updateArticle(data));
    dispatch(resetArticle());
  };

  const resetFormHandeler = () => {
    setTextArea({ title: '', text: '', likes: 0, dislikes: 0 });
  };

  useEffect(() => {
    dispatch(article());
  }, [articleObj]);

  useEffect(() => {
    dispatch(resetArticle());
  }, [articles]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
  }, [isSuccess]);






  if (isLoading) {
    return <small>Loading......</small>;
  }

  return (
    <div>
      <FormStyled onSubmit={submitPostHandeler}>
        <InputField
          type="tex"
          name="title"
          value={textArea.title || ''}
          placeholder={'title'}
          handelchange={changeHandeler}
        />
        <TextArea
          rows={4}
          name="text"
          value={textArea.text || ''}
          placeholder={'type your comment'}
          handelchange={changeHandeler}
        />
        <Flex2Column>
          <InputButton
            btnType="submit"
            btnName={editStatus ? 'Update' : 'Submit'}
          />
          <InputButton
            btnType="reset"
            btnName="Reset"
            btnFunction={resetFormHandeler}
          />
        </Flex2Column>
      </FormStyled>

      {articles.length > 0 ? (
        articles.map((post) => {
          const { _id } = post;
          return (
            <PostsList
              article={post}
              key={_id}
              responseHandeler={responseHandeler}
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
