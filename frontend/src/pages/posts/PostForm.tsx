import React, { useState, useEffect, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  articlePost,
  updateArticle,
  resetArticle,
} from '@src/reducers/articles/articleReductrs';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import InputField from '@components/input-field/InputField';
import TextArea from '@components/text-area/TextArea';
import InputButton from '@components/button/Button';
import { uploadImage, resetUser } from '@reducers/auth/authReducer';

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
  editStatus?: boolean;
  setEditStatus?: React.Dispatch<React.SetStateAction<boolean>>;
  article?: IState;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

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

function PostForm({ editStatus, article, setShow, id }: postFormProps) {
  const [textArea, setTextArea] = useState({} as IState);

  const [IsBtnEnable, setIsBtnEnable] = useState(true);
  const { singleImage } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const changeHandeler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setTextArea({ ...textArea, [name]: value });
    setIsBtnEnable(false);
  };

  const submitPostHandeler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (textArea?.title === '' || textArea?.description === '') {
      toast.error('Please fill all the field');
      return;
    }

    if (editStatus) {
      const data: { id: string; obj: {} } = {
        id: id,
        obj: { ...textArea },
      };

      dispatch(updateArticle(data));
    } else {
      dispatch(articlePost(textArea));
      setTextArea({ ...formFields });
      dispatch(resetUser());
    }
    if (setShow) {
      setShow(false);
    }

    dispatch(resetArticle());
  };

  const updateImgHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append('picUrl', e.target.files![0]);

    dispatch(uploadImage(formData));
    setIsBtnEnable(false);
    e.target.value = '';
  };

  useEffect(() => {
    if (singleImage !== '') {
      setTextArea({ ...textArea, picturePath: singleImage });
    }
  }, [singleImage]);

  const resetFormHandeler = () => {
    setTextArea({ ...formFields });
  };

  useEffect(() => {
    if (article) {
      setTextArea(article);
    }
  }, []);

  return (
    <div>
      <FormStyled onSubmit={submitPostHandeler}>
        <InputGroup className="mb-3">
          <InputField
            type="file"
            name="fileName"
            placeholder="Your img"
            handelchange={updateImgHandeler}
            inputStyle="upload-img-btn"
          />
          <InputGroup.Text id="inputGroup-sizing-default">
            Browse
          </InputGroup.Text>
          <Form.Control
            disabled
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={textArea?.picturePath || ''}
          />
        </InputGroup>

        <InputField
          type="tex"
          name="title"
          value={textArea?.title || ''}
          placeholder={'title'}
          handelchange={changeHandeler}
        />
        <TextArea
          rows={4}
          name="description"
          value={textArea?.description || ''}
          placeholder={'type your comment'}
          handelchange={changeHandeler}
        />
        <Flex2Column>
          <InputButton
            disabled={IsBtnEnable}
            btnType="submit"
            btnName={editStatus ? 'Update & save' : 'Submit'}
          />
          {editStatus ? (
            ''
          ) : (
            <InputButton
              disabled={IsBtnEnable}
              btnType="reset"
              btnName="Reset"
              btnFunction={resetFormHandeler}
            />
          )}
        </Flex2Column>
      </FormStyled>
    </div>
  );
}

export default PostForm;
