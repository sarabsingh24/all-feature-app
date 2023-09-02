import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/reducers/hooks';

//reducer
import { loginUser } from '@reducers/auth/authReducer';

//common
import InputField from '@components/input-field/InputField';
import InputButton from '@src/components/button/Button';
import { WrapperStyle } from './Login-style';

type LoginProps = {
  email: string;
  password: string;
};

const formLable = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginProps>({} as LoginProps);

  const { user } = useAppSelector((state) => state.auth);
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
    const IsUserExist = user.email !== '';
    
    if (IsUserExist) {
      navigate('/');
    }
  }, [user]);

  return (
    <WrapperStyle>
      <div className="box-width">
        <h3> Login</h3>
        <form onSubmit={submitFormHandeler} className="form-box">
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
          Don't have an account?
          <Link to="/register"> Sign Up</Link>
        </small>
      </div>
    </WrapperStyle>
  );
};
export default Login;
