import React, { useState, useEffect } from 'react';
import { Box, HStack, Image, Input, Spinner, Text } from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../../utils/Buttons';
import AddCvImg from '../AddCvImg';
import AddLangTag from '../LangTag/AddLangTag';
import MDE from '../MDE';
import logo from '../../assets/logo/logo.png';
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
                     disabled={uploadingImg}
                  >
                     Preview
                  </SecondaryBtn>
                  <LeavePageAlert />
               </Box>
            </Box>

            {/* body */}
            <Box
               align='start'
               bg='white'
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
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
                        placeholder='New post title here...'
                        fontSize={{ base: '2rem', md: '2.5rem' }}
                        fontWeight='700'
                        value={postTitle}
                        height='60px'
                        className='title-input'
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

                     <Box w='100%' my='.5rem !important'>
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

            {/* buttons container */}
            <HStack
               justify='flex-end'
               w='100%'
               py='.5rem'
               px='.5rem'
               pos='sticky'
               bottom='0'
               zIndex='1'
               bg='#f5f5f5'
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
                  bg='rgb(59 73 223)'
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
