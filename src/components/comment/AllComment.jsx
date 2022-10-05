import React from 'react';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileData } from '../../helper/getUserProfileData';
import CommentItem from './CommentItem';
import { useEffect } from 'react';
import { setCurrentComments } from '../../store/comment/currentComments';
import { useAuth } from '../../context/auth';

const AllComment = ({ postDetail }) => {
   const dispatch = useDispatch();
   const user = useAuth();

   useEffect(() => {
      dispatch(setCurrentComments(postDetail.comments));
   }, [postDetail.comments, dispatch]);

   const profileData = useSelector((state) => state.profileData.profileData);
   const currentComments = useSelector(
      (state) => state.currentComments.currentComments
   );

   const repliedComment = (replies) =>
      Object.values(replies).sort((a, b) => a.createdAt - b.createdAt); //ascending ordered by created at;

   return (
      <Box mt='2rem'>
         {postDetail.comments.map((comment) => (
            <Box key={comment.commentId}>
               <CommentItem
                  avatarSize='30px'
                  footerPs='37px'
                  comments={currentComments}
                  authorId={postDetail.userId}
                  currentUserId={user?.userId}
                  likes={comment.likes}
                  text={comment.value}
                  createdAt={comment.createdAt}
                  currentUserProfile={getUserProfileData(
                     profileData,
                     comment.userId
                  )}
                  userId={comment.userId}
                  postId={postDetail.id}
                  commentId={comment.commentId}
                  edited={comment.edited}
                  editedAt={comment.editedAt}
               />
               {Object.values(comment.replies).length !== 0 &&
                  repliedComment(comment.replies).map((item) => (
                     <CommentItem
                        key={item.commentId}
                        comments={currentComments}
                        authorId={postDetail.userId}
                        currentUserId={user?.userId}
                        likes={item.likes}
                        ps='20px'
                        avatarSize='28px'
                        footerPs='35px'
                        text={item.value}
                        createdAt={item.createdAt}
                        currentUserProfile={getUserProfileData(
                           profileData,
                           item.userId
                        )}
                        repliedUserName={
                           getUserProfileData(profileData, item.repliedUserId)
                              .name
                        }
                        userId={item.userId}
                        postId={postDetail.id}
                        commentId={item.commentId}
                        edited={item.edited}
                        editedAt={item.editedAt}
                        reply={true}
                     />
                  ))}
            </Box>
         ))}
      </Box>
   );
};

export default AllComment;
