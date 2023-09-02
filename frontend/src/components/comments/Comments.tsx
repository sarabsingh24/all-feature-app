import React, { useState, useEffect } from 'react';
import TextArea from '@components/text-area/TextArea';
import InputButton from '@components/button/Button';
import { CommentBox, FirstAlpha, CommentList } from './Comment-styled';

import { useAppSelector, useAppDispatch } from '@src/reducers/hooks';
import { updateComment } from '@reducers/articles/articleReductrs';
import {randomColorPiker} from '@components/utility/UtilityFunctions'

type commentText = {
  commentedBy: string;
  text: string;
  createdAt: number;
};

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
  comments: commentText[];
  createdAt: string;
};

type Props = {
  article: articleObj;
  userId?: string;
};

const Comments: React.FC<Props> = ({ article, userId }) => {
  const [commentTxt, setCommentTxt] = useState<string>('');
  const [commentList, setCommentList] = useState([...article.comments]);

  const dispatch = useAppDispatch();


  useEffect(() => {
    setCommentList(article.comments);
  }, [article.comments]);

  const commentTxtHandeler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCommentTxt(value);
  };

  const submitComment = () => {
    const data: any = {
      id: article._id,
      userId: userId,
      text: commentTxt,
    };
    dispatch(updateComment(data));
  };

  return (
    <div>
      <TextArea
        rows={4}
        name="description"
        value={commentTxt || ''}
        placeholder={'type your comment'}
        handelchange={(e) => commentTxtHandeler(e)}
      />
      <InputButton
        btnType="input"
        btnName="Submit Comment"
        btnFunction={submitComment}
      />
      <CommentBox>
        {commentList.length > 0 &&
          commentList.map((list: any) => {
            return (
              <CommentList key={list.createdAt}>
                <FirstAlpha style={{ background: randomColorPiker() }}>
                  {list.commentedBy[0]}
                </FirstAlpha>
                <div>
                  <small>{list.commentedBy}</small>
                  <div>{list.text}</div>
                </div>
              </CommentList>
            );
          })}
      </CommentBox>
    </div>
  );
};

export default Comments;
