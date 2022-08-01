import {
   Button,
   Flex,
   HStack,
   Image,
   Input,
   Spinner,
   Text,
   Tooltip,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeImage, uploadImage } from '../lib/api';
import { setCvImg as setCvImgToStore } from '../store/publishPost';
import { SecondaryBtn } from '../utils/Buttons';

const AddCvImg = ({ cvImgFromLocalStorage }) => {
   const [cvImg, setCvImg] = useState(
      cvImgFromLocalStorage || {
         url: null,
         path: null,
      }
   );

   const [uploading, setUploading] = useState(false);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setCvImgToStore(cvImg));
   }, [cvImg, dispatch]);

   const handleCVImageUpload = (e) => {
      const image = e.target.files[0];
      if (image) {
         cvImg.path && removeImage(cvImg.path);

         const selectedImgPath = `images/${image.name}${nanoid()}`;
         setUploading(true);

         uploadImage(image, selectedImgPath)
            .then((url) => {
               setUploading(false);
               setCvImg({ url, path: selectedImgPath });
            })
            .catch((err) => console.log(err));

         e.target.value = '';
      }
   };

   const handleCVImgRemove = (path) => {
      setCvImg({ url: null, path: null });
      removeImage(path).catch((err) => console.log(err));
   };

   return (
      <Flex mb='1rem' justify='flex-start' align='center' flexWrap='wrap'>
         {uploading && (
            <HStack>
               <Spinner color='blue' size='md' />
               <Text letterSpacing='1px'>Uploading...</Text>
            </HStack>
         )}

         {!uploading && cvImg.url && (
            <Image
               src={cvImg.url}
               alt='cover_image'
               w='250px'
               h='105px'
               objectFit='scale-down'
               mr='1rem'
            />
         )}

         {!uploading && (
            <HStack mt='3'>
               <Tooltip
                  label='Use a ratio of 100:42 for best result.'
                  aria-label='A tooltip'
                  bg='black'
                  borderRadius='3px'
               >
                  <Button
                     as='label'
                     border='2px solid #d6d6d7'
                     m='0'
                     p={2}
                     bg='#F5F5F5'
                     fontWeight={400}
                     cursor='pointer'
                  >
                     <Input
                        display='none'
                        type='file'
                        accept='image/jpeg, image/png, image/jpg , image/webp, image/gif'
                        onChange={handleCVImageUpload}
                     />
                     {cvImg.url ? 'change' : 'Add a cover image'}
                  </Button>
               </Tooltip>

               {cvImg.url && (
                  <SecondaryBtn
                     color='red'
                     hoverColor='red'
                     onClick={() => handleCVImgRemove(cvImg.path)}
                  >
                     Remove
                  </SecondaryBtn>
               )}
            </HStack>
         )}
      </Flex>
   );
};

export default React.memo(AddCvImg);
