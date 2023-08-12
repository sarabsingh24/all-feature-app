import React, { useState } from 'react';
import { WrapperStyle, ParaStyle, TitleStyle, FlexSB } from './Post-styled';

type ProductListProps = {
  article: {
    _id: string;
    title: string;
    text: string;
  };
  updateHandeler: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    article: { title: string; text: string; _id: string }
  ) => void;
  deleteHandeler: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => void;
};

const PostsList = ({
  article,
  updateHandeler,deleteHandeler,
}: ProductListProps) => {
  return (
    <WrapperStyle>
      <TitleStyle>{article.title}</TitleStyle>
      <ParaStyle>{article.text}</ParaStyle>
      <FlexSB>
        <span>likes:{99}</span>
        <span>unlike:{99}</span>
        <span onClick={(event) => updateHandeler(event,article)}>
          Edit
        </span>
        <span onClick={(event) => deleteHandeler(event, article._id)}>
          Delete
        </span>
      </FlexSB>
    </WrapperStyle>
  );
};

export default PostsList;
