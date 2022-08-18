import {
   Box,
   HStack,
   Image,
   Input,
   Spinner,
   Text,
   VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import AddCvImg from './AddCvImg';
import AddLangTag from './LangTag/AddLangTag';
import MDE from './MDE';
import logo from '../assets/logo/logo.png';
import ModalAlert from './Modla';
import { useNavigate } from 'react-router-dom';

const CreatePostFrom = ({
   handleSubmit,
   postData,
   pageTitle,
   setPostTitle,
   publishing,
   savingDraft,
   uploadingImg,
   setUploadingImg,
   postTitle,
   toEdit,
}) => {
   const naviagte = useNavigate();

   const [touch, setTouch] = useState(false);

   const submit = (publishingType) => {
      if (postTitle) {
         handleSubmit(publishingType);
         return;
      }
      setTouch(true);
   };

   return (
      <Box mt='-3.5rem' mb='1rem'>
         <Box maxW='768px' m='auto'>
            <Box display='flex' mx={{ base: '.5rem', lg: '0rem' }}>
               <Box display='flex' alignItems='center' mr='auto'>
                  <Image
                     src={logo}
                     cursor='pointer'
                     alt='logo'
                     w='50px'
                     h='40px'
                     onClick={() => naviagte('/')}
                  />
                  <Text fontSize='xl' ms='1'>
                     {pageTitle} Post
                  </Text>
               </Box>
               <ModalAlert />
            </Box>

            <VStack
               as='form'
               align='start'
               bg='white'
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               borderRadius='5px'
               mt='1rem'
               p={{ base: '1rem 0.5rem', md: '1rem 2rem' }}
            >
               <AddCvImg
                  cvImgFromLocalStorage={postData?.cvImg}
                  setUploadingImg={setUploadingImg}
               />

               <Input
                  variant='unstyled'
                  placeholder='New post title here...'
                  fontSize={{ base: '2rem', md: '2.5rem' }}
                  fontWeight='700'
                  value={postTitle}
                  height='60px'
                  m='0'
                  required
                  onChange={({ target }) => setPostTitle(target.value)}
                  _placeholder={{ color: '#525252' }}
               />
               {touch && !postTitle && (
                  <Text
                     px='.5rem'
                     borderRadius='3px'
                     fontSize='15px'
                     letterSpacing='.5px'
                     background='#FBE9E9'
                     color='red'
                  >
                     Title can't be blank!
                  </Text>
               )}

               <AddLangTag filteredTagsFromLocalStorage={postData?.tags} />

               <Box mt='1.5rem !important' w='100%' mb='.5rem !important'>
                  <MDE
                     MDEValue={postData?.MDEValue}
                     where='CREATE_POST'
                     isSubmitting={publishing}
                     setUploadingImg={setUploadingImg}
                  />
               </Box>

               {/* buttons container */}
               <HStack justify='flex-end' w='100%'>
                  {!toEdit && (
                     <SecondaryBtn
                        disabled={uploadingImg || publishing || savingDraft}
                        onClick={() => submit('draft')}
                     >
                        {savingDraft ? 'Saving Draft' : 'Save Draft'}
                     </SecondaryBtn>
                  )}

                  <PrimaryBtn
                     bg='rgb(59 73 223)'
                     disabled={uploadingImg || publishing || savingDraft}
                     onClick={() => submit('publish')}
                  >
                     {publishing ? (
                        <>
                           <Spinner size='sm' mr='1' /> Publishing
                        </>
                     ) : toEdit ? (
                        'Save Changes'
                     ) : (
                        'Publish'
                     )}
                  </PrimaryBtn>
               </HStack>
            </VStack>
         </Box>
      </Box>
   );
};

export default CreatePostFrom;
