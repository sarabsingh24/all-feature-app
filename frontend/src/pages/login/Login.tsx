import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';

import InputField from '@components/input-field/InputField';
import InputButton from '@src/components/button/Button';

import { useAppDispatch, useAppSelector } from '@src/reducers/hooks';
import { loginUser } from '@reducers/auth/authReducer';

type LoginProps = {
  email: string;
  password: string;
};

const formLable = {
  email: '',
  password: '',
};

const Login = () => {
  const [form, setForm] = useState<LoginProps>(formLable);

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
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess]);

  return (
    <React.Fragment>
      <h3> Login</h3>
      <form onSubmit={submitFormHandeler}>
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
        <Link to='/register'>Signup here</Link>
      </small>
    </React.Fragment>
  );
};
export default Login;
