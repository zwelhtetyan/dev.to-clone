import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import DraftPostItem from '../post/DraftPostItem';
import NoDataMessage from './NoDataMessage';

const Drafts = () => {
   const user = useAuth();
   const userId = user.userId;

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   let draftPosts = null;
   if (transformedData && !loading && !err) {
      draftPosts = transformedData.filter(
         (postData) => postData.userId === userId && postData.draft
      );
   }

   if (draftPosts.length === 0 && !loading && !err) {
      return <NoDataMessage title='No Drafted posts here 👻' />;
   }

   return (
      <Box>
         {draftPosts &&
            draftPosts.map((postData) => (
               <DraftPostItem
                  key={postData.id}
                  title={postData.title}
                  postId={postData.id}
               />
            ))}
      </Box>
   );
};

export default Drafts;
