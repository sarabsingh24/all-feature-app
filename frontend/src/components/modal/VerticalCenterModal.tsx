import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PostForm from '@pages/posts/PostForm';
import Form from 'react-bootstrap/Form';

type articleObj = {
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  likes: {};
  location: string;
  userPicturePath: string;
  picturePath: [];
  comments: [];
  createdAt: string;
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

type modalProps = {
  article: articleObj;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  IsBtnEnable: boolean;
  setIsBtnEnable: React.Dispatch<React.SetStateAction<boolean>>;
  changeHandeler?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    textArea: articleObj
  ) => void;
  imagesArray:boolean
};

function VerticallyCenteredModal({
  show,
  handleClose,
  setShow,
  article,
  imagesArray,
}: modalProps) {
  const [editStatus, setEditStatus] = useState(true);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostForm
          editStatus={editStatus}
          setEditStatus={setEditStatus}
          article={article}
          setShow={setShow}
          id={article._id}
          imagesArray={imagesArray}
        />
      </Modal.Body>
    </Modal>
  );
}
export default VerticallyCenteredModal;
