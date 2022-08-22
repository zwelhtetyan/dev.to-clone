import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import { getUserProfileData } from '../../helper/getUserProfileData';
import CommentItem from './CommentItem';

const AllComment = ({ postDetail }) => {
   const user = useAuth();
   const { userId } = user;

   const profileData = useSelector((state) => state.profileData.profileData);

   const repliedComment = (replies) =>
      Object.values(replies).sort((a, b) => a.createdAt - b.createdAt); // ordered by created at;

   return (
      <Box mt='2rem'>
         {postDetail.comments.map((comment) => (
            <Box key={comment.commentId}>
               <CommentItem
                  avatarSize='28px'
                  comments={postDetail.comments}
                  currentUserId={userId}
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
                        comments={postDetail.comments}
                        currentUserId={userId}
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
