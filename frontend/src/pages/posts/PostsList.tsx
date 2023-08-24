import React, { useEffect, useState, useCallback } from 'react';
import { WrapperStyle, ParaStyle, TitleStyle, FlexSB } from './Post-styled';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import {
  article,
  articlePost,
  updateArticle,
  likesArticle,
  deleteArticle,
  resetArticle,
  // responseArticles,
} from '@src/reducers/articles/articleReductrs';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

import VerticallyCenteredModal from '@components/modal/VerticalCenterModal';

type articleObj = {
  _id: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  likes: {};
  location: string;
  userPicturePath: string;
  picturePath: string;
  comments: [];
  createdAt: string;
};

type ProductListProps = {
  article: articleObj;
};

const PostsList = ({ article }: ProductListProps) => {
  const [textArea, setTextArea] = useState({} as articleObj);
  const [show, setShow] = useState(false);
  const [IsBtnEnable, setIsBtnEnable] = useState(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const ind = article?.picturePath?.indexOf('assets');
  const trimedPath = article?.picturePath?.slice(ind);

  const deleteHandeler = useCallback((e: React.SyntheticEvent, id: string) => {
    dispatch(deleteArticle(id));
    dispatch(resetArticle());
  }, []);

  const likesHandeler = (
    e: React.SyntheticEvent,
    article: {
      _id: string;
    }
  ) => {
    const data: { id: string; obj: {} } = {
      id: article._id,
      obj: article,
    };

    dispatch(likesArticle(data));
  };

  useEffect(() => {
    setTextArea(article);
  }, []);

  return (
    <WrapperStyle>
      <Card>
        <Card.Img
          variant="top"
          className="img-style"
          src={`http://localhost:3000/${trimedPath}`}
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>

          <FlexSB>
            <Button
              variant="light"
              size="sm"
              onClick={(event) => likesHandeler(event, article)}
            >
              Like:
              {Object.keys(article.likes).length}
            </Button>

            <Button variant="light" size="sm">
              Comments
            </Button>

            <Button variant="light" size="sm" onClick={handleShow}>
              Edit
            </Button>
            <VerticallyCenteredModal
              show={show}
              setShow={setShow}
              handleClose={handleClose}
              IsBtnEnable={IsBtnEnable}
              setIsBtnEnable={setIsBtnEnable}
              article={article}
            />

            <Button
              variant="light"
              size="sm"
              onClick={(event) => deleteHandeler(event, article._id)}
            >
              Delete
            </Button>
          </FlexSB>
        </Card.Body>
      </Card>
    </WrapperStyle>
  );
};

export default PostsList;
