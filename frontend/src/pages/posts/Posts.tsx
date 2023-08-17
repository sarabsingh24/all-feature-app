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
  const [artList, setArtList] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [id, setID] = useState('');

  const { articles, articleObj, isLoading, isSuccess, message } =
    useAppSelector((state) => state.articles);
    
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(article());
  }, []);

  useEffect(() => {
    setArtList(articles);
  }, [articles]);

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
      const updateLikes: any = artList.map(
        (item: { _id: string; likes: number; dislikes: number }) => {
          if (item._id === id) {
            return { ...artList, title: textArea.title, text: textArea.text };
          }
          return item;
        }
      );
      setArtList(updateLikes);
     
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

    const updateLikes: any = artList.map(
      (item: { _id: string; likes: number; dislikes: number }) => {
        if (item._id === article._id) {
          if (attName === 'likes') {
            return { ...item, likes: item.likes + 1 };
          } else {
            return { ...item, dislikes: item.dislikes + 1 };
          }
        }
        return item;
      }
    );

    setArtList(updateLikes);
    setID(article._id);
  };

  useEffect(() => {
    if (id) {
      const updateObj: any = artList.find(
        (item: { _id: string }) => item._id === id
      );

      const data: { id: string; obj: {} } = {
        id: id,
        obj: updateObj,
      };
      dispatch(updateArticle(data));
      dispatch(resetArticle());
      setID('');
    }
  }, [artList]);

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
    console.log(id)
    dispatch(deleteArticle(id));
    dispatch(resetArticle());
  };

  const resetFormHandeler = () => {
    setTextArea({ title: '', text: '', likes: 0, dislikes: 0 });
  };

  // useEffect(() => {
  //   dispatch(resetArticle());
  // }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(message);
  //   }
  // }, [isSuccess]);







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

      {artList.length > 0 ? (
        artList.map((post) => {
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
