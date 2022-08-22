import React from 'react';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileData } from '../../helper/getUserProfileData';
import CommentItem from './CommentItem';
import { useEffect } from 'react';
import { setCurrentComments } from '../../store/comment/currentComments';

const AllComment = ({ postDetail }) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setCurrentComments(postDetail.comments));
   }, [postDetail.comments, dispatch]);

   const profileData = useSelector((state) => state.profileData.profileData);
   const currentComments = useSelector(
      (state) => state.currentComments.currentComments
   );

   const repliedComment = (replies) =>
      Object.values(replies).sort((a, b) => a.createdAt - b.createdAt); // ordered by created at;

   return (
      <Box mt='2rem'>
         {postDetail.comments.map((comment) => (
            <Box key={comment.commentId}>
               <CommentItem
                  avatarSize='28px'
                  comments={currentComments}
                  currentUserId={postDetail.userId}
                  likes={comment.likes}
                  footerPs='36px'
                  text={comment.value}
                  createdAt={comment.createdAt}
                  currentUserProfile={getUserProfileData(
                     profileData,
                     comment.userId
                  )}
                  createdUserId={postDetail.userId}
                  userId={comment.userId}
                  postId={postDetail.id}
                  commentId={comment.commentId}
               />
               {Object.values(comment.replies).length !== 0 &&
                  repliedComment(comment.replies).map((item) => (
                     <CommentItem
                        key={item.commentId}
                        comments={currentComments}
                        currentUserId={postDetail.userId}
                        likes={item.likes}
                        avatarSize='25px'
                        ps='20px'
                        footerPs='33px'
                        text={item.value}
                        createdAt={item.createdAt}
                        currentUserProfile={getUserProfileData(
                           profileData,
                           item.userId
                        )}
                        createdUserId={postDetail.userId}
                        userId={item.userId}
                        postId={postDetail.id}
                        commentId={item.commentId}
                     />
                  ))}
            </Box>
         ))}
      </Box>
   );
};

export default AllComment;
