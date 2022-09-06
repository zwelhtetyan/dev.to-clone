import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import PostItem from '../post/PostItem';
import NoDataMessage from './NoDataMessage';

const Posts = () => {
   const user = useAuth();
   const userId = user.userId;

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   let publishedPosts = null;
   if (transformedData && !loading && !err) {
      publishedPosts = transformedData.filter(
         (postData) => postData.userId === userId && !postData.draft
      );
   }

   if (publishedPosts.length === 0 && !loading && !err) {
      return <NoDataMessage title='No Published posts here 👻' />;
   }

   return (
      <Box>
         {publishedPosts &&
            publishedPosts.map((postData) => (
               <PostItem
                  key={postData.id}
                  name={postData.name}
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
