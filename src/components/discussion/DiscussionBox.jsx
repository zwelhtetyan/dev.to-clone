import { Box, HStack, Spinner } from '@chakra-ui/react';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../config/firebase';
import converter from '../../helper/converter';
import { setCommentVal } from '../../store/comment/comment';
import { PrimaryBtn, SecondaryBtn } from '../../utils/Buttons';
import MDE from '../MDE';
import '../../styles/markdown.scss';
import { useAuth } from '../../context/auth';

const DiscussionBox = ({ id, comments, showDismiss, onDismiss }) => {
   const [submitting, setSubmitting] = useState(false);
   const [hasValue, setHasValue] = useState(false);
   const [uploadingImg, setUploadingImg] = useState(false);
   const [mdeTab, setMdeTab] = useState('write');

   const commentVal = useSelector((state) => state.comment.commentVal);
   const dispatch = useDispatch();

   const user = useAuth();

   useEffect(() => {
      setHasValue(commentVal?.trim().length !== 0);
   }, [commentVal]);

   const mdeTabChangeHandler = () => {
      setMdeTab((prev) => (prev === 'write' ? 'preview' : 'write'));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);

      const docRef = doc(db, 'posts', id);

      const updateComments = async () => {
         const createdAt = Timestamp.now();
         await updateDoc(docRef, {
            comments: [
               ...comments,
               {
                  value: converter().makeHtml(commentVal),
                  createdAt,
                  userId: user.userId,
               },
            ],
         });

         setSubmitting(false);
         dispatch(setCommentVal(''));
      };

      updateComments().catch((err) => {
         setSubmitting(false);
         console.log(err);
      });
   };

   return (
      <Box>
         <Box
            as='form'
            onSubmit={handleSubmit}
            border='1px solid rgb(59 73 223)'
            borderRadius='5px'
            overflow='hidden'
            className='discussion-box'
         >
            <MDE
               MDEValue={commentVal}
               where='DISCUSSION'
               setHasValue={setHasValue}
               isSubmitting={submitting}
               setUploadingImg={setUploadingImg}
               placeholder='Add to the discussion'
            />
         </Box>

         {/* buttons */}
         <HStack justify='flex-end' w='100%' mt='.3rem' id='hi'>
            {showDismiss && (
               <SecondaryBtn onClick={onDismiss}>Dismiss</SecondaryBtn>
            )}

            <SecondaryBtn
               disabled={!hasValue || uploadingImg || submitting}
               onClick={mdeTabChangeHandler}
            >
               {mdeTab === 'write' ? 'Preview' : 'Edit'}
            </SecondaryBtn>

            <PrimaryBtn
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
