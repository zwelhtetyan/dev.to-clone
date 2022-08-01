import { HStack, Spinner, VStack } from '@chakra-ui/react';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { PrimaryBtn, SecondaryBtn } from '../../utils/Buttons';
import MDE from '../MDE';

const DiscussionBox = ({ id }) => {
   const [submitting, setSubmitting] = useState(false);
   const [hasValue, setHasValue] = useState(false);
   const [uploadingMDEImg, setUploadingMDEImg] = useState(false);

   const commentVal = useSelector((state) => state.comment.commentVal);

   const value = document.querySelector('.mde-text')?.value;

   useEffect(() => {
      setHasValue(value?.trim().length !== 0);
   }, [value]);

   const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitting(true);

      const docRef = doc(db, 'posts', id);

      const updateComments = async () => {
         await updateDoc(docRef, {
            comments: arrayUnion(commentVal),
         });

         setSubmitting(false);
         // console.log(commentVal);

         document.querySelector('.mde-text').value = '';
         console.log(document.querySelector('.mde-text').value);
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
            MDEValue={null}
            where='DISCUSSION'
            height={150}
            setHasValue={setHasValue}
            setUploadingMDEImg={setUploadingMDEImg}
            isSubmitting={submitting}
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
