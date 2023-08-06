import React, { useState } from 'react';

type ProductListProps = {
  article: {
    _id: string;
    title: string;
    text: string;
  };
};

const PostsList = ({ article }: ProductListProps) => {
  return (
    <div>
      <div key={article._id}>
        article
        <span>{article.title}</span> ;=
        <span>{article.text}</span>
      </div>
    </div>
  );
};

export default PostsList;
