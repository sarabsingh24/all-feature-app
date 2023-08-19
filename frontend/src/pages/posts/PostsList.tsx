import React, { useEffect, useState } from 'react';
import { WrapperStyle, ParaStyle, TitleStyle, FlexSB } from './Post-styled';
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
  
  updateHandeler: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    article: articleObj
  ) => void;
  deleteHandeler: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void;
};

const PostsList = ({
  article,
  updateHandeler,
  deleteHandeler,
}:
ProductListProps) => {
  
  
  const dispatch = useAppDispatch();
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TitleStyle>{article.title}</TitleStyle>
        <small>id:{article._id}</small>

        {/* <small>{article.createdAt}</small> */}
      </div>
      <div>{article.description}</div>
      <small>by:{article.firstName}</small>
      <FlexSB>
        <div
          className="art-info"
          data-name="likes"
          onClick={(event) => likesHandeler(event, article)}
        >
          likes:{Object.keys(article.likes).length}
        </div>
        <div
          className="art-info"
          data-name="dislike"
          // onClick={(event) => responseHandeler(event, article)}
        >
          {/* dislikes:{article.dislikes} */}
        </div>
        <div
          className="art-info"
          onClick={(event) => updateHandeler(event, article)}
        >
          Edit
        </div>
        <div
          className="art-info"
          onClick={(event) => deleteHandeler(event, article._id)}
        >
          Delete
        </div>
      </FlexSB>
    </WrapperStyle>
  );
};

export default PostsList;
