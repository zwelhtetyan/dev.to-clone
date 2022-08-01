import { HStack, Spinner, VStack } from '@chakra-ui/react';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase';
import converter from '../../helper/converter';
import { setCommentVal } from '../../store/comment';
import { PrimaryBtn, SecondaryBtn } from '../../utils/Buttons';
import MDE from '../MDE';

const DiscussionBox = ({ id }) => {
   const [submitting, setSubmitting] = useState(false);
   const [hasValue, setHasValue] = useState(false);
   const [uploadingMDEImg, setUploadingMDEImg] = useState(false);

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
         await updateDoc(docRef, {
            comments: arrayUnion(converter().makeHtml(commentVal)),
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
      >
         <MDE
            MDEValue={commentVal}
            where='DISCUSSION'
            height={150}
            setHasValue={setHasValue}
            isSubmitting={submitting}
            setUploadingMDEImg={setUploadingMDEImg}
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
               disabled={!hasValue || uploadingMDEImg}
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
