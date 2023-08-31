import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


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

type Props = {
  size: 'sm' | 'lg' | 'xl';
  smShow: boolean;
  setSmShow: any;
  setDeleteArticle: any;
  article: articleObj;
};

const ConfermationModal: React.FC<Props> = ({
  size,
  smShow,
  setSmShow,
  setDeleteArticle,
  article,
}) => {
  return (
    <Modal
      size={size}
      show={smShow}
      onClick={() => setSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          Delete: {article.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {article.description}
        <div onClick={() => setDeleteArticle(true)}>Delete</div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfermationModal