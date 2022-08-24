import { Box, HStack, Image, Input, Spinner, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import AddCvImg from './AddCvImg';
import AddLangTag from './LangTag/AddLangTag';
import MDE from './MDE';
import logo from '../assets/logo/logo.png';
import ModalAlert from './Modal';
import { useNavigate } from 'react-router-dom';
import PostPreview from './PostPreview';
import NoTitleMessage from '../utils/NoTitleMessage';

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

   const [mdeTab, setMdeTab] = useState('write');

   const mdeTabChangeHandler = (tabName) => {
      setMdeTab(tabName);
   };

   //helper sumbit
   const submit = (publishingType) => {
      if (postTitle) {
         handleSubmit(publishingType);
         return;
      }
      setTouch(true);
   };

   return (
      <Box mt='-3.5rem'>
         <Box maxW='768px' m='auto'>
            {/* navbar */}
            <Box display='flex' mx={{ base: '.5rem', lg: '0rem' }}>
               <Box
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='center'
                  mr='auto'
               >
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
               <Box ms='auto'>
                  <SecondaryBtn onClick={() => mdeTabChangeHandler('write')}>
                     Edit
                  </SecondaryBtn>
                  <SecondaryBtn
                     m='0 1rem 0 .5rem'
                     onClick={() => mdeTabChangeHandler('preview')}
                  >
                     Preview
                  </SecondaryBtn>
                  <ModalAlert />
               </Box>
            </Box>

            <Box
               align='start'
               bg='white'
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               borderRadius='5px'
               mt={{ base: '.5rem', md: '1rem' }}
               p={{ base: '0.5rem', md: '1rem' }}
            >
               {mdeTab === 'write' && (
                  <Box w='100%'>
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
                     {touch && !postTitle && <NoTitleMessage />}

                     <AddLangTag
                        filteredTagsFromLocalStorage={postData?.tags}
                     />

                     <Box w='100%' my='.5rem !important'>
                        <MDE
                           MDEValue={postData?.MDEValue}
                           isSubmitting={publishing || savingDraft}
                           setUploadingImg={setUploadingImg}
                        />
                     </Box>
                  </Box>
               )}

               {mdeTab === 'preview' && <PostPreview />}

               {/* buttons container */}
               <HStack justify='flex-end' w='100%' mt='.5rem'>
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
            </Box>
         </Box>
      </Box>
   );
};

export default CreatePostFrom;
