import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import { getUserProfileData } from '../../helper/getUserProfileData';
import { updateComment } from '../../lib/api';
import CommentItem from './CommentItem';
import { useState } from 'react';

const AllComment = ({ postDetail }) => {
   const user = useAuth();
   const { userId } = user;

   const profileData = useSelector((state) => state.profileData.profileData);
   const [updatingLike, setUpdatingLike] = useState({
      status: false,
      commentId: '',
   });

   const repliedComment = (replies) =>
      Object.values(replies).sort((a, b) => a.createdAt - b.createdAt); // ordered by created at;

   const handleClickLike = (commentId) => {
      setUpdatingLike({ status: true, commentId });

      const modifiedComments = postDetail.comments.map((comment) => {
         if (comment.commentId === commentId) {
            return {
               ...comment,
               likes: comment.likes.includes(userId)
                  ? comment.likes.filter((id) => id !== userId)
                  : [...comment.likes, userId],
            };
         }

         const innerComments = Object.values(comment.replies);

         if (innerComments.find((cmt) => cmt.commentId === commentId)) {
            const modifiedInnerComments = innerComments.map((cmt) =>
               cmt.commentId === commentId
                  ? {
                       ...cmt,
                       likes: cmt.likes.includes(userId)
                          ? cmt.likes.filter((id) => id !== userId)
                          : [...cmt.likes, userId],
                    }
                  : cmt
            );

            return {
               ...comment,
               replies: { ...modifiedInnerComments },
            };
         }

         return comment;
      });

      updateComment(modifiedComments, postDetail.id)
         .then((_) => {
            setUpdatingLike({ status: false, commentId });
            console.log('updated');
         })
         .catch((err) => {
            setUpdatingLike({ status: false, commentId });
            console.log(err);
         });
   };

   return (
      <Box mt='2rem'>
         {postDetail.comments.map((comment) => (
            <Box key={comment.commentId}>
               <CommentItem
                  avatarSize='28px'
                  handleClickLike={handleClickLike}
                  currentUserId={userId}
                  updatingLike={updatingLike}
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
                        handleClickLike={handleClickLike}
                        currentUserId={userId}
                        updatingLike={updatingLike}
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
