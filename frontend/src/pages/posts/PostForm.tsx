import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  articlePost,
  updateArticle,
  resetArticle,
} from '@src/reducers/articles/articleReductrs';
import { toast } from 'react-toastify';

import InputField from '@components/input-field/InputField';
import TextArea from '@components/text-area/TextArea';
import InputButton from '@components/button/Button';

import { FormStyled, Flex2Column } from './Post-styled';

type IState = {
  title: string;
  description: string;
  likes: {};
  firstName: string;
  lastName: string;
  location: string;
  userPicturePath: string;
  picturePath: string;
  comments: never[];
};

type postFormProps = {
  editStatus: boolean;
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>;
  textArea: IState;
  setTextArea: React.Dispatch<React.SetStateAction<IState>>;
  formFields: IState;
  id: string;
};

function PostForm({
  editStatus,
  setEditStatus,
  textArea,
  setTextArea,
  formFields,
  id,
}: postFormProps) {
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

    if (textArea.title === '' || textArea.description === '') {
      toast.error('Please fill all the field');
      return;
    }

    if (editStatus) {
      const data: { id: string; obj: {} } = {
        id: id,
        obj: { ...textArea },
      };

      dispatch(updateArticle(data));
      setEditStatus(!editStatus);
    } else {
      dispatch(articlePost(textArea));
    }
    setTextArea({ ...formFields });

    dispatch(resetArticle());
  };

  const resetFormHandeler = () => {
    setTextArea({ ...formFields });
  };

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
          name="description"
          value={textArea.description || ''}
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
    </div>
  );
}

export default PostForm;
