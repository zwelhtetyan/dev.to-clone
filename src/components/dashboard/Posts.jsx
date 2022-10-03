import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import { PrimaryBtn } from '../../utils/Buttons';
import PostItem from '../post/PostItem';
import NoDataMessage from './NoDataMessage';

const Posts = () => {
   const user = useAuth();
   const userId = user.userId;
   const navigate = useNavigate();

   const {
      transformedData,
      transformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   let publishedPosts = null;
   if (transformedData && !loading && !err) {
      publishedPosts = transformedData
         .filter((postData) => postData.userId === userId && !postData.draft)
         .sort((a, b) => b.createdAt - a.createdAt);
   }

   if (publishedPosts.length === 0 && !loading && !err) {
      return (
         <NoDataMessage
            title={`This is where you can manage your posts, but you haven't written anything yet.`}
         >
            <PrimaryBtn
               bg='light.primary'
               m='1rem 0 0 0'
               onClick={() => navigate('/create-post')}
            >
               Write your first post now
            </PrimaryBtn>
         </NoDataMessage>
      );
   }

   return (
      <Box>
         {publishedPosts &&
            publishedPosts.map((postData) => (
               <PostItem
                  key={postData.id}
                  name={postData.name}
                  username={postData.username}
                  profile={postData.profile}
                  id={postData.id}
                  createdAt={postData.createdAt}
                  title={postData.title}
                  tags={postData.tags}
                  readTime={postData.readTime}
                  isUpdated={postData?.updated}
                  fromDashboard={true}
                  userId={postData.userId}
                  currentUserId={user.userId} // authenticated userId
                  totalDiscussion={calcTotalDiscussion(postData.comments)}
                  totalReaction={calculateReaction(
                     postData.heart,
                     postData.unicorn,
                     postData.saved
                  )}
               />
            ))}
      </Box>
   );
};

export default Posts;
