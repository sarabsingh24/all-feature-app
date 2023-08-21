import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '@components/input-field/InputField';
import InputButton from '@src/components/button/Button';
import { useAppDispatch, useAppSelector } from '@src/reducers/hooks';
import {
  registerUser,
  resetUser,
  uploadImage,
} from '@reducers/auth/authReducer';

import { WrapperStyle } from './Register-style';
import { fileURLToPath } from 'url';
import { toast } from 'react-toastify';

type formProps = {
  firstName: string;
  lastName: string;
  location: string;
  occupation: string;

  picturePath?: string;
  email: string;
  password: string;
};

const formFields = {
  firstName: '',
  lastName: '',
  location: '',
  occupation: '',
  picturePath: '',
  email: '',
  password: '',
};

const Register = () => {
  const [form, setForm] = useState<formProps>(formFields);
  const [imgPath, setImgPath] = useState('');

  const { user, isError, isSuccess, isLoading, message, singleImage } =
    useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const allFielsFilled = Object.values(form).some((value) => value === '');

  const inputChangeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;

    setForm({ ...form, [name]: value });
  };

  const submitFormHandeler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!allFielsFilled) {
      dispatch(registerUser(form));
    }
  };

  const updateImgHandeler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append('picUrl', e.target.files![0]);

    dispatch(uploadImage(formData));
  };

  useEffect(() => {
    if (singleImage !== '') {
      setForm({ ...form, picturePath: singleImage });
    }
  }, [singleImage]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!allFielsFilled && isSuccess) {
      navigate('/login');
      dispatch(resetUser());
    }

    //  dispatch(resetUser());
  }, [user, isError, isSuccess, isLoading, message]);

  return (
    <WrapperStyle>
      <div className="box-width">
        <h3>Register User</h3>
        <form onSubmit={submitFormHandeler} className="center-box">
          <InputField
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName || ''}
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName || ''}
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="text"
            name="location"
            value={form.location || ''}
            placeholder="Your location"
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="text"
            name="occupation"
            value={form.occupation || ''}
            placeholder="Your occupation"
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="text"
            name="picturePath"
            value={form.picturePath || ''}
            placeholder="Your picturePath"
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="file"
            name="fileName"
            placeholder="Your img"
            handelchange={updateImgHandeler}
          />

          <InputField
            type="text"
            name="email"
            value={form.email || ''}
            placeholder="Your Email"
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="password"
            name="password"
            value={form.password || ''}
            placeholder="Your Password"
            handelchange={inputChangeHandeler}
          />
          <InputButton btnType="submit" btnName="Submit" />
        </form>
        <small>
          Already have an account?
          <Link to="/login"> Log In</Link>
        </small>
      </div>
    </WrapperStyle>
  );
};

export default Register;
