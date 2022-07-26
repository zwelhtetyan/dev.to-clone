import {
   Button,
   Flex,
   HStack,
   Image,
   Input,
   Spinner,
   Text,
} from '@chakra-ui/react';
import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytes,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storage } from '../firebase';
import { setCvImgUrl } from '../store/publishPost';
import { SecondaryBtn } from '../utils/Buttons';

const AddCvImg = () => {
   //states
   const [cvImg, setCvImg] = useState({
      url: null,
      path: null,
   });

   const [uploading, setUploading] = useState(false);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setCvImgUrl(cvImg.url));
   }, [cvImg.url, dispatch]);

   const handleCVImageUpload = (e) => {
      const image = e.target.files[0];
      if (image) {
         cvImg.path && handleCVImgRemove(cvImg.path);
         const sendRequest = async () => {
            setUploading(true);
            const selectedImgPath = `images/${image.name}${nanoid()}`;
            const cvImgRef = ref(storage, selectedImgPath);
            await uploadBytes(cvImgRef, image);

            const url = await getDownloadURL(cvImgRef);
            setUploading(false);
            setCvImg({ url, path: selectedImgPath });
         };

         sendRequest().catch((err) => console.log(err));
      }
   };

   const handleCVImgRemove = (path) => {
      setCvImg({ url: null, path: null });
      const desertRef = ref(storage, path);
      deleteObject(desertRef)
         .then((res) => {
            console.log('removed');
         })
         .catch((err) => console.log(err));
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
               <Button
                  as='label'
                  border='2px solid #d6d6d7'
                  m='0'
                  p={2}
                  bg='#F5F5F5'
                  fontWeight={400}
               >
                  <Input
                     display='none'
                     type='file'
                     accept='image/jpeg, image/png, image/jpg , image/webp'
                     onChange={handleCVImageUpload}
                  />
                  {cvImg.url ? 'change' : 'Add a cover image'}
               </Button>

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

export default AddCvImg;
