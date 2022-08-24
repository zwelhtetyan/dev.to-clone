import { Box, Heading, HStack } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DiscussionBox from '../components/discussion/DiscussionBox';
import converter from '../helper/converter';

const EditComment = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);
   const navigate = useNavigate();

   const currentCommentItem = useSelector(
      (state) => state.currentComments.commentItem
   );

   const onDismiss = () => {
      navigate(-1);
   };

   const valueToEdit = converter().makeMarkdown(currentCommentItem.value);

   const transformedComments = (comments, MDEValue) => {
      const externalComments = comments.map((comment) =>
         comment.commentId === currentCommentItem.commentId
            ? { ...comment, value: converter().makeHtml(MDEValue) }
            : comment
      );

      return externalComments.map((comment) => ({
         ...comment,
         replies: {
            ...Object.values(comment.replies).map((cmt) =>
               cmt.commentId === currentCommentItem.commentId
                  ? { ...cmt, value: converter().makeHtml(MDEValue) }
                  : cmt
            ),
         },
      }));
   };

   return (
      <HStack h='calc(100vh - 120px)' px={{ md: '.5rem' }}>
         <Box
            p={['1rem .5rem', '1rem .5rem', '2rem 2.5rem']}
            maxW='900px'
            w='100%'
            m='auto'
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
            />
         </Box>
      </HStack>
   );
};

export default EditComment;
