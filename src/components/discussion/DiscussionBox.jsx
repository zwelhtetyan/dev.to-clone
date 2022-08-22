import React, { useState } from 'react';
import { Box, HStack, Spinner } from '@chakra-ui/react';
import converter from '../../helper/converter';
import { PrimaryBtn, SecondaryBtn } from '../../utils/Buttons';
import MDE from '../MDE';
import '../../styles/markdown.scss';
import { htmlToJsx } from '../../helper/htmlToJsx';
import { updateComment } from '../../lib/api';
import { useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../context/auth';
import { nanoid } from 'nanoid';

const DiscussionBox = ({ postId, commentId, showDismiss, onDismiss }) => {
   const user = useAuth();

   const [submitting, setSubmitting] = useState(false);
   const [uploadingImg, setUploadingImg] = useState(false);
   const [mdeTab, setMdeTab] = useState('write');
   const [MDEValue, setMDEValue] = useState('');

   const { transformedData } = useSelector((state) => state.transformedData);
   const comments = transformedData.find((data) => data.id === postId).comments;

   const hasValue = MDEValue.trim();

   const mdeTabChangeHandler = () => {
      setMdeTab((prev) => (prev === 'write' ? 'preview' : 'write'));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);

      const createdAt = Timestamp.now();
      const newComment = {
         value: converter().makeHtml(MDEValue),
         replies: {},
         createdAt,
         userId: user.userId,
         commentId: nanoid(),
         likes: [],
      };

      let modifiedComments = [];
      if (commentId) {
         modifiedComments = comments.map((comment) =>
            comment.commentId === commentId ||
            Object.values(comment.replies).find(
               (cmt) => cmt.commentId === commentId
            )
               ? {
                    ...comment,
                    replies: { ...comment.replies, [nanoid()]: newComment },
                 }
               : comment
         );
      } else {
         modifiedComments = [...comments, newComment];
      }

      updateComment(modifiedComments, postId)
         .then((_) => {
            setSubmitting(false);
            setMDEValue('');
            onDismiss && onDismiss();
            console.log('added comment successfully');
         })
         .catch((err) => {
            setSubmitting(false);
            console.log(err);
         });
   };

   return (
      <Box>
         {mdeTab === 'write' && (
            <Box
               borderRadius='5px'
               boxShadow='0 0 0 1px rgb(59 73 233)'
               overflow='hidden'
               className='discussion-box mde-preview'
            >
               <MDE
                  MDEValue={MDEValue}
                  setMDEValue={setMDEValue}
                  isSubmitting={submitting}
                  setUploadingImg={setUploadingImg}
                  placeholder='Add to the discussion'
               />
            </Box>
         )}

         {mdeTab === 'preview' && (
            <Box
               minH='192px'
               borderRadius='5px'
               p='10px !important'
               className='mde-preview-content'
               boxShadow='0 0 0 1px #d6d6d7'
               fontSize={['1rem', '1.1rem']}
            >
               {htmlToJsx(converter().makeHtml(MDEValue))}
            </Box>
         )}

         {/* buttons */}
         <HStack justify='flex-end' w='100%' mt='.3rem' id='hi'>
            {showDismiss && (
               <SecondaryBtn onClick={onDismiss}>Dismiss</SecondaryBtn>
            )}

            <SecondaryBtn
               disabled={
                  (!hasValue && mdeTab === 'write') ||
                  uploadingImg ||
                  submitting
               }
               onClick={mdeTabChangeHandler}
            >
               {mdeTab === 'write' ? 'Preview' : 'Edit'}
            </SecondaryBtn>

            <PrimaryBtn
               onClick={handleSubmit}
               bg='rgb(59 73 223)'
               disabled={!hasValue || uploadingImg || submitting}
            >
               {submitting ? (
                  <>
                     <Spinner size='sm' mr='1' /> Submitting
                  </>
               ) : (
                  'Submit'
               )}
            </PrimaryBtn>
         </HStack>
      </Box>
   );
};

export default DiscussionBox;
