import React, { useState, useEffect } from 'react';
import {
   Box,
   HStack,
   Image,
   Input,
   Spinner,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../../utils/Buttons';
import AddCvImg from '../AddCvImg';
import AddLangTag from '../TagSuggestion/AddLangTag';
import MDE from '../MDE';
import logo from '../../assets/images/logo.png';
import LeavePageAlert from '../LeavePageAlert';
import { useNavigate } from 'react-router-dom';
import PostPreview from './PostPreview';
import NoTitleMessage from '../../utils/NoTitleMessage';

const CreatePostFrom = ({
   publishPostHandler,
   draftPostHandler,
   eidtPostHandler,
   setPostTitle,
   postTitle,
   postData,
   pageTitle,
   publishing,
   savingDraft,
   uploadingImg,
   setUploadingImg,
   toEdit,
   setUploadedMDEImg,
}) => {
   const naviagte = useNavigate();

   const [touch, setTouch] = useState(false);
   const [mdeTab, setMdeTab] = useState('write');

   const mdeTabChangeHandler = (tabName) => {
      setMdeTab(tabName);
   };

   const isToEdit = toEdit && !postData.draft;

   const onSubmit = (handler) => {
      setTouch(true);

      if (postTitle) {
         handler();
      }
   };

   //set placeholder
   useEffect(() => {
      if (mdeTab === 'write') {
         document.querySelector('.mde-text').placeholder =
            'Write your post content here...';
      }
   }, [mdeTab]);

   return (
      <Box
         mt='-3.5rem'
         sx={{ 'input, textarea': { background: 'transparent !important' } }}
      >
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
                     disabled={uploadingImg}
                  >
                     Preview
                  </SecondaryBtn>
                  <LeavePageAlert />
               </Box>
            </Box>

            {/* body */}
            <Box height='calc(100vh - 110px)' overflow='auto'>
               <Box
                  align='start'
                  bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
                  className='shadow'
                  borderRadius='5px'
                  mt={{ base: '.5rem', md: '1rem' }}
                  p={{ base: '.5rem', md: '1rem' }}
               >
                  {mdeTab === 'write' && (
                     <Box w='100%'>
                        <AddCvImg
                           cvImgFromLocalStorage={postData?.cvImg}
                           setUploadingImg={setUploadingImg}
                        />

                        <Input
                           variant='unstyled'
                           ps='.5rem'
                           placeholder='New post title here...'
                           bg='transparent !important'
                           fontSize={{ base: '2rem', md: '2.5rem' }}
                           fontWeight='700'
                           value={postTitle}
                           height='60px'
                           _focus={{
                              border: 'none !important',
                              boxShadow: 'none !important',
                           }}
                           m='0'
                           required
                           onChange={({ target }) => setPostTitle(target.value)}
                           _placeholder={{ color: '#525252' }}
                        />
                        {touch && !postTitle && <NoTitleMessage />}

                        <AddLangTag
                           filteredTagsFromLocalStorage={postData?.tags}
                        />

                        <Box w='100%' mt='.5rem !important'>
                           <MDE
                              MDEValue={postData?.MDEValue}
                              isSubmitting={publishing || savingDraft}
                              setUploadingImg={setUploadingImg}
                              setUploadedMDEImg={setUploadedMDEImg}
                           />
                        </Box>
                     </Box>
                  )}

                  {mdeTab === 'preview' && <PostPreview />}
               </Box>
            </Box>

            {/* buttons container */}
            <HStack
               justify='flex-end'
               w='100%'
               py='.5rem'
               px='.5rem'
               pos='sticky'
               bottom='0'
               zIndex='1'
               bg={useColorModeValue('light.bg', 'dark.bg')}
            >
               {!isToEdit && (
                  <SecondaryBtn
                     onClick={() => onSubmit(draftPostHandler)}
                     disabled={savingDraft || publishing || uploadingImg}
                  >
                     {savingDraft ? (
                        <>
                           <Spinner size='sm' mr='1' /> Saving draft
                        </>
                     ) : (
                        'Save draft'
                     )}
                  </SecondaryBtn>
               )}

               <PrimaryBtn
                  bg='light.primary'
                  onClick={() =>
                     onSubmit(isToEdit ? eidtPostHandler : publishPostHandler)
                  }
                  disabled={publishing || savingDraft || uploadingImg}
               >
                  {publishing ? (
                     <>
                        <Spinner size='sm' mr='1' />{' '}
                        {isToEdit ? 'Saving changes' : 'Publishing'}
                     </>
                  ) : (
                     <>{isToEdit ? 'Save changes' : 'Publish'}</>
                  )}
               </PrimaryBtn>
            </HStack>
         </Box>
      </Box>
   );
};

export default CreatePostFrom;
