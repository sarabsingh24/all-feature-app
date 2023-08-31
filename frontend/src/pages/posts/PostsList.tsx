import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//reducer
import { useAppDispatch } from '@src/reducers/hooks';
import {
  likesArticle,
  deleteArticle,
  resetArticle,
  // responseArticles,
} from '@src/reducers/articles/articleReductrs';

//components
import VerticallyCenteredModal from '@components/modal/VerticalCenterModal';
import { WrapperStyle, ParaStyle, TitleStyle, FlexSB } from './Post-styled';
import Carousal from '@components/carousal/Carousal';
import ConfermationModal from '@components/modal/ConfermationModal';

//Bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

type articleObj = {
  _id: string;
  userId: string;
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

type ProductListProps = {
  article: articleObj;
  userId?: string;
  editPost?: boolean;
};

const PostsList: React.FC<ProductListProps> = ({
  article,
  userId,
  editPost,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [smShow, setSmShow] = useState(false);
  const [deleteFromList, setDeleteFromList] = useState<boolean>(false);
  const [IsBtnEnable, setIsBtnEnable] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const trimImgPath = article.picturePath.map((img: string[]) => {
    const ind = img?.indexOf('assets');
    const newLink = `http://localhost:3000/${img?.slice(ind)}`;
    return newLink;
  });

  const deleteHandeler = () => {
    setSmShow(true);
  };

  useEffect(() => {
    if (deleteFromList) {
      dispatch(deleteArticle(article._id));
      dispatch(resetArticle());
      setDeleteFromList(false);
    }
  }, [smShow, deleteFromList]);

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

  return (
    <WrapperStyle>
      <Card>
        <Carousal trimImgPath={trimImgPath} />

        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.description}</Card.Text>

          <FlexSB>
            {userId === article.userId && !editPost && (
              <Button
                variant="light"
                size="sm"
                onClick={(event) => likesHandeler(event, article)}
              >
                Like:
                {Object.keys(article.likes).length}
              </Button>
            )}
            {userId === article.userId && !editPost && (
              <Button variant="light" size="sm">
                Comments
              </Button>
            )}
            {userId === article.userId && editPost && (
              <Button variant="light" size="sm" onClick={handleShow}>
                Edit
              </Button>
            )}
            {userId === article.userId && editPost && (
              <Button variant="light" size="sm" onClick={deleteHandeler}>
                Delete
              </Button>
            )}
          </FlexSB>
        </Card.Body>
      </Card>
      <VerticallyCenteredModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        IsBtnEnable={IsBtnEnable}
        setIsBtnEnable={setIsBtnEnable}
        article={article}
        imagesArray={true}
      />
      <ConfermationModal
        size={'lg'}
        smShow={smShow}
        setSmShow={setSmShow}
        article={article}
        setDeleteArticle={setDeleteFromList}
      />
    </WrapperStyle>
  );
};

export default PostsList;
