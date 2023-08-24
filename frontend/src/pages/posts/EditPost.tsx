import React,{useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { useLocation } from 'react-router-dom';

import PostForm from './PostForm';


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





const EditPost = () => {
    const [textArea, setTextArea] = useState(formFields);
    const [editStatus, setEditStatus] = useState(false);
    const [id, setID] = useState('');

 const { articles, isLoading, isSuccess, message } = useAppSelector(
   (state) => state.articles
 );
 const dispatch = useAppDispatch();
 const location = useLocation();
 const user = location.state;
  return (
    <div>
      <h1>Edit Post</h1>
      {/* <PostForm
        editStatus={editStatus}
        setEditStatus={setEditStatus}
        // textArea={textArea}
        // setTextArea={setTextArea}
        // formFields={formFields}
        id={id}
      /> */}
    </div>
  );
}

export default EditPost