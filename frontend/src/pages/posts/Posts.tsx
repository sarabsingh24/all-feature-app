import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  article,
  articlePost,
  updateArticle,
  deleteArticle,
  resetArticle,
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
};

function Posts() {
  const [listArr, setListArr] = useState([]);
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

  const submitPostHandeler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (textArea.title === '' || textArea.text === '') {
      toast.error('Please fill all the field');
      return;
    }

    if (editStatus) {
      const filterData: any = articles.map((item: { _id: string }) => {
        if (item._id === id) {
          return { ...textArea };
        }
        return item;
      });
      // setListArr(filterData);

      const data: { id: string; obj: {} ,arr:[]} = {
        id: id,
        obj: { ...textArea },
        arr: filterData
      };

      dispatch(updateArticle(data));
      setEditStatus(false);
    } else {
      dispatch(articlePost(textArea));
    }
    setTextArea({ title: '', text: '' });
    dispatch(article());
  };

  const updateHandeler = (
    e: React.SyntheticEvent,
    article: { title: string; text: string; _id: string }
  ) => {
    setTextArea({ title: article.title, text: article.text });
    setID(article._id);
    setEditStatus(true);
  };

  const deleteHandeler = (e: React.SyntheticEvent, id: string) => {
    // const filterData: any = articles.filter(
    //   (item: { _id: string }) => item._id !== id
    // );
    // setListArr(filterData);

    dispatch(deleteArticle(id));
    dispatch(resetArticle());
  };

  const resetFormHandeler = () => {
    setTextArea({ title: '', text: '' });
  };

  useEffect(() => {
    dispatch(article());
  }, [articleObj]);

  useEffect(() => {
    // setListArr(articles);
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
