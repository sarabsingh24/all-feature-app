import React, { useState } from 'react';
import { WrapperStyle, ParaStyle, TitleStyle, FlexSB } from './Post-styled';

type ProductListProps = {
  article: {
    _id: string;
    title: string;
    text: string;
    likes: number;
    dislikes: number;
  };
  responseHandeler:( event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    article: {
      title: string;
      text: string;
      _id: string;
      likes: number;
      dislikes: number;
    }
  ) => void;
  updateHandeler: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    article: {
      title: string;
      text: string;
      _id: string;
      likes: number;
      dislikes: number;
    }
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
  responseHandeler,
}: ProductListProps) => {
  return (
    <WrapperStyle>
      <TitleStyle>{article.title}</TitleStyle>
      <ParaStyle>{article.text}</ParaStyle>
      <FlexSB>
        <div
          className="art-info"
          data-name="likes"
          onClick={(event) => responseHandeler(event, article)}
        >
          likes:{article.likes}
        </div>
        <div
          className="art-info"
          data-name="dislike"
          onClick={(event) => responseHandeler(event, article)}
        >
          dislikes:{article.dislikes}
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
