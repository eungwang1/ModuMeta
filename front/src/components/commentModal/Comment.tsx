import React from 'react';
import shortid from 'shortid';
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import { useAppSelector } from '@store/hook';
import * as S from './style';
import { IPost } from '@customTypes/post';
import { IComment } from '@customTypes/comment';

interface CommentProps {
  updateCommentsData: IComment[] | null;
}

const Comment = ({ updateCommentsData }: CommentProps) => {
  const initialComments = useAppSelector((state) => state.postSlice.dataForModal?.Comments);
  const Comments = updateCommentsData ? updateCommentsData : initialComments;
  return (
    <S.CommentWrapper>
      {Comments?.map((comment, idx) => (
        <>
          <S.CommentContainer key={shortid.generate()}>
            <S.PromfileImg large src={comment.User?.profile_image} />
            <S.ContentAndBottomWrapper>
              <ReplyInput comment={comment} />
            </S.ContentAndBottomWrapper>
          </S.CommentContainer>
          <Reply comment={comment} />
        </>
      ))}
    </S.CommentWrapper>
  );
};

export default Comment;
