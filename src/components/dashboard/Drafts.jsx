import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { PrimaryBtn } from '../../utils/Buttons';
import DraftPostItem from '../post/DraftPostItem';
import NoDataMessage from './NoDataMessage';

const Drafts = () => {
   const user = useAuth();
   const userId = user.userId;
   const navigate = useNavigate();

   const {
      transformedData,
      transformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   let draftPosts = null;
   if (transformedData && !loading && !err) {
      draftPosts = transformedData.filter(
         (postData) => postData.userId === userId && postData.draft
      );
   }

   if (draftPosts.length === 0 && !loading && !err) {
      return (
         <NoDataMessage title='You have not saved any draft yet.'>
            <PrimaryBtn
               bg='light.primary'
               m='1rem 0 0 0'
               onClick={() => navigate('/create-post')}
            >
               Write your post now
            </PrimaryBtn>
         </NoDataMessage>
      );
   }

   return (
      <Box>
         {draftPosts &&
            draftPosts.map((postData) => (
               <DraftPostItem
                  key={postData.id}
                  username={postData.username}
                  title={postData.title}
                  postId={postData.id}
               />
            ))}
      </Box>
   );
};

export default Drafts;
