import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import InputField from '@components/input-field/InputField';
import InputButton from '@src/components/button/Button';
import { useAppDispatch, useAppSelector } from '@src/reducers/hooks';
import { getUserInfo } from '@reducers/users/usersReducer';
import { WrapperStyle } from './Profile-style';

import { updateUser, uploadImage } from '@reducers/auth/authReducer';

const formData = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  occupation: '',
  userPicturePath: '',
  picturePath: '',
};

const Profile = () => {
  const [form, setForm] = useState(formData);
  const [upddateField, setUpddateField] = useState({});
  const [IsDiseabled] = useState(true);

  const { userProfile, singleImage } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { _id } = location.state;

  useEffect(() => {
    
      form['firstName'] =userProfile['firstName'];
      form['lastName'] = userProfile['lastName'];
      form['location'] = userProfile['location'];
      form['occupation'] = userProfile['occupation'];
      form['userPicturePath'] = userProfile['userPicturePath'];
      form['picturePath'] = userProfile['picturePath'];
      form['email'] = userProfile['email'];

//       for (let key in form){
// key = userProfile[key];
//       }
  
    setForm(userProfile);
  }, []);

  const inputChangeHandeler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let name = e.target.name;

    setForm({ ...form, [name]: value });
    setUpddateField({ ...upddateField, [name]: value });
  };

  const submitFormHandeler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      id: _id,
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
   
    if (singleImage !== '') {
      setForm({ ...form, picturePath: singleImage });
    }
  }, [singleImage]);

  useEffect(() => {
    dispatch(getUserInfo(_id));
  }, [_id, dispatch, userProfile]);



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

export default Profile;
