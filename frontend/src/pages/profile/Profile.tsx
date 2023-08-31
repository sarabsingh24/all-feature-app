import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

//reducer
import { useAppDispatch, useAppSelector } from '@src/reducers/hooks';
import { getUserInfo } from '@reducers/users/usersReducer';
import { updateUser, uploadImage } from '@reducers/auth/authReducer';

//bootstrap
import Layout from '@pages/layout/Layout';
import InputField from '@components/input-field/InputField';
import InputButton from '@src/components/button/Button';
import { WrapperStyle } from './Profile-style';



type articleObj = {
  firstName: string;
  lastName: string;
  email: string;
  occupation:string;
  title: string;
  description: string;
  likes: {};
  location: string;
  userPicturePath: string;
  picturePath: string;
  comments: [];
  createdAt: string;
};



const Profile:React.FC = () => {
  const [form, setForm] = useState<articleObj>({} as articleObj);
  const [upddateField, setUpddateField] = useState<{} >({});
  const [IsDiseabled] = useState(true);

  const { userProfile, singleImage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const locationState = useLocation();
  const user = locationState.state;

  const inputChangeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;

    setForm({ ...form, [name]: value });
    setUpddateField({ ...upddateField, [name]: value });
  };

  const submitFormHandeler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: user._id,
      obj: form,
    };

    dispatch(updateUser(data));
   
  };

  const updateImgHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append('picUrl', e.target.files![0]);

    dispatch(uploadImage(formData));
  };

  useEffect(() => {
    if (singleImage !== '' ) {
      // setUpddateField({ ...upddateField, picturePath: singleImage });
      setForm({ ...form, picturePath: singleImage });
    }
  }, [singleImage]);

  useEffect(() => {
    dispatch(getUserInfo(user._id));
    // setForm({ ...form, picturePath: userProfile.picturePath });
  }, [userProfile]);

  useEffect(() => {
    const newObj = { ...user, picturePath: userProfile?.picturePath || user?.picturePath};
   
    delete newObj.token;
    setForm(newObj);
  }, [locationState.state]);

  

  return (
    <WrapperStyle>
      <div className="box-width">
        <h3>update profile</h3>
        <form onSubmit={submitFormHandeler} className="center-box">
          <InputField
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form?.firstName || ''}
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form?.lastName || ''}
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="text"
            name="location"
            value={form?.location || ''}
            placeholder="Your location"
            handelchange={inputChangeHandeler}
          />
          <InputField
            type="text"
            name="occupation"
            value={form?.occupation || ''}
            placeholder="Your occupation"
            handelchange={inputChangeHandeler}
          />
          <InputField
            disabled={IsDiseabled}
            type="text"
            name="picturePath"
            value={form?.picturePath || ''}
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
            disabled={IsDiseabled}
            type="text"
            name="email"
            value={form?.email || ''}
            placeholder={form?.email}
            handelchange={inputChangeHandeler}
          />

          <InputButton btnType="submit" btnName="Submit" />
        </form>
      </div>
    </WrapperStyle>
  );
};

export default Layout(Profile);
