import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '@components/input-field/InputField';
import InputButton from '@src/components/button/Button';
import { useAppDispatch, useAppSelector } from '@src/reducers/hooks';
import { registerUser, resetUser } from '@reducers/auth/authReducer';

type formProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const formData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const Register = () => {
  const [form, setForm] = useState<formProps>(formData);

  const { isSuccess } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const inputChangeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;
    setForm({ ...form, [name]: value });
  };

  const submitFormHandeler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetUser());
      navigate('/login');
    }
  }, [isSuccess]);

  return (
    <React.Fragment>
      <h1>Register User</h1>
      <form onSubmit={submitFormHandeler}>
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
    </React.Fragment>
  );
};

export default Register;
