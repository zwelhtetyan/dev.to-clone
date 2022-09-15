import { Box, Heading, HStack } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import DiscussionBox from '../components/discussion/DiscussionBox';
import { getURLFromMDE } from '../helper/getURLFromMDE';
import {
   getItemFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';

const EditComment = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);
   const navigate = useNavigate();

   const currentCommentItem = useSelector(
      (state) => state.currentComments.commentItem
   );

   const valueToEdit = currentCommentItem.value;

   const prevUploadedMDEImgToEdit = getURLFromMDE(valueToEdit);

   const [uploadedMDEImgToEditComment, setUploadedMDEImgToEditComment] =
      useState(
         prevUploadedMDEImgToEdit ||
            getItemFromLocalStorage('uploadedMDEImgToEditComment') ||
            []
      );

   useEffect(() => {
      saveToLocalStorage(
         'uploadedMDEImgToEditComment',
         JSON.stringify(uploadedMDEImgToEditComment)
      );
   }, [uploadedMDEImgToEditComment]);

   if (!currentCommentItem) {
      return <Navigate to={-1} />;
   }

   const onDismiss = () => {
      navigate(-1);
   };

   const transformedComments = (comments, MDEValue) => {
      const externalComments = comments.map((comment) =>
         comment.commentId === currentCommentItem.commentId
            ? {
                 ...comment,
                 value: MDEValue,
                 edited: true,
                 editedAt: Timestamp.now(),
              }
            : comment
      );

      return externalComments.map((comment) => ({
         ...comment,
         replies: {
            ...Object.values(comment.replies).map((cmt) =>
               cmt.commentId === currentCommentItem.commentId
                  ? {
                       ...cmt,
                       value: MDEValue,
                       edited: true,
                       editedAt: Timestamp.now(),
                    }
                  : cmt
            ),
         },
      }));
   };

   return (
      <HStack px={{ md: '.5rem' }} flex='1' w='100%' justify='center'>
         <Box
            p={['1rem .5rem', '1rem .5rem', '2rem 2.5rem']}
            maxW='900px'
            w='100%'
            borderRadius={{ md: '5px' }}
            bg='rgb(255 255 255)'
            boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         >
            <Heading fontSize={['1.3rem', '1.7rem']} mb='1.5rem'>
               Editing comment
            </Heading>
            <DiscussionBox
               postId={currentCommentItem.postId}
               commentId={currentCommentItem.commentId}
               valueToEdit={valueToEdit}
               onDismiss={onDismiss}
               showDismiss={true}
               transformedComments={transformedComments}
               uploadedMDEImgToEditComment={uploadedMDEImgToEditComment}
               setUploadedMDEImgToEditComment={setUploadedMDEImgToEditComment}
            />
         </Box>
      </HStack>
   );
};

export default EditComment;
