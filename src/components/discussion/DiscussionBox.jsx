import React, { useEffect, useState } from 'react';
import { Box, HStack, Spinner } from '@chakra-ui/react';
import converter from '../../helper/converter';
import { PrimaryBtn, SecondaryBtn } from '../../utils/Buttons';
import MDE from '../MDE';
import '../../styles/customizeMDE.scss';
import { htmlToJsx } from '../../helper/htmlToJsx';
import { updateComment } from '../../lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../context/auth';
import { nanoid } from 'nanoid';
import { removeFromLocalStorage } from '../../helper/localStorage';
import { setLoginAlert } from '../../store/loginAlert';

const DiscussionBox = ({
   postId,
   commentId,
   showDismiss,
   onDismiss,
   valueToEdit,
   transformedComments,
   repliedUserId,
}) => {
   const user = useAuth();
   const dispatch = useDispatch();

   const [submitting, setSubmitting] = useState(false);
   const [uploadingImg, setUploadingImg] = useState(false);
   const [mdeTab, setMdeTab] = useState('write');
   const [MDEValue, setMDEValue] = useState(valueToEdit || '');

   const { transformedData } = useSelector((state) => state.transformedData);
   const comments = transformedData?.find(
      (data) => data.id === postId
   )?.comments;

   const hasValue = MDEValue.trim();

   const mdeTabChangeHandler = () => {
      setMdeTab((prev) => (prev === 'write' ? 'preview' : 'write'));
   };

   useEffect(() => {
      const textArea = document.querySelector('.mde-text');

      if (!user) {
         document.querySelector('.mde-header').style.display = 'none';
      }

      const checkUser = () => {
         if (!user) {
            dispatch(setLoginAlert(true));
         }
      };

      textArea?.addEventListener('click', checkUser);

      return () => textArea?.removeEventListener('click', checkUser);
   }, [user, dispatch]); // hide mde-header if user is not authenticated

   // insert placeholder
   useEffect(() => {
      const textBoxes = [...document.querySelectorAll('.mde-text')];
      textBoxes.map((textbox, idx) =>
         idx === 0
            ? (textbox.placeholder = 'Add to the discussion...')
            : (textbox.placeholder = 'Reply...')
      );
   }, [mdeTab]);

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

      if (valueToEdit) {
         modifiedComments = transformedComments(comments, MDEValue);
      } else if (commentId) {
         modifiedComments = comments.map((comment) =>
            comment.commentId === commentId ||
            Object.values(comment.replies).find(
               (cmt) => cmt.commentId === commentId
            )
               ? {
                    ...comment,
                    replies: {
                       ...comment.replies,
                       [nanoid()]: {
                          ...newComment,
                          repliedUserId,
                          repliedCommentId: commentId,
                       },
                    },
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
            // onDismiss && onDismiss(); // close discussionBox immediately without accepting new state value
            onDismiss && setTimeout(onDismiss, 100); // need new state value ('submitting = false') to disable || enable to MDE after state change
            setMdeTab('write');
            removeFromLocalStorage('commentItemToManage');
            console.log('added comment successfully');
         })
         .catch((err) => {
            setSubmitting(false);
            console.log(err);
         });
   };

   return (
      <Box className='mde-preview'>
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
               />
            </Box>
         )}

         {mdeTab === 'preview' && (
            <Box
               minH='192px'
               borderRadius='5px'
               padding='10px !important'
               className='mde-preview-content'
               boxShadow='0 0 0 1px #d6d6d7'
               fontSize={['1rem', '1.1rem']}
               sx={{ p: { marginBottom: '5px !important' } }}
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
