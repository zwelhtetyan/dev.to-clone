import { HStack, Spinner, VStack } from '@chakra-ui/react';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../config/firebase';
import converter from '../../helper/converter';
import { setCommentVal } from '../../store/comment/comment';
import { PrimaryBtn } from '../../utils/Buttons';
import MDE from '../MDE';
import '../../styles/markdown.scss';

const DiscussionBox = ({ id, comments }) => {
   const [submitting, setSubmitting] = useState(false);
   const [hasValue, setHasValue] = useState(false);
   const [uploadingImg, setUploadingImg] = useState(false);

   const commentVal = useSelector((state) => state.comment.commentVal);
   const dispatch = useDispatch();

   useEffect(() => {
      setHasValue(commentVal?.trim().length !== 0);
   }, [commentVal]);

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
      <VStack
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
         />
         <HStack
            justify='flex-end'
            w='100%'
            m='.5rem 1.5rem .5rem 0 !important'
         >
            {/* <SecondaryBtn>Dismiss</SecondaryBtn> */}
            <PrimaryBtn
               type='submit'
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
      </VStack>
   );
};

export default DiscussionBox;
