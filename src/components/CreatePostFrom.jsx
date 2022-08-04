import {
   Box,
   HStack,
   Image,
   Input,
   Spinner,
   Text,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import AddCvImg from './AddCvImg';
import AddLangTag from './LangTag/AddLangTag';
import MDE from './MDE';
import logo from '../assets/logo/logo.png';
import ModalAlert from './Modla';

const CreatePostFrom = ({
   handleSubmit,
   postData,
   pageTitle,
   setPostTitle,
   publishing,
   uploadingMDEImg,
   setUploadingMDEImg,
   toEdit,
}) => {
   return (
      <Box maxW='768px' m='auto'>
         <Box display='flex'>
            <Box display='flex' alignItems='center' mr='auto'>
               <Image src={logo} alt='logo' w='58px' h='40px' />
               <Text fontSize='xl' ms='1'>
                  {pageTitle} Post
               </Text>
            </Box>
            <ModalAlert />
         </Box>

         <VStack
            onSubmit={handleSubmit}
            as='form'
            align='start'
            bg='white'
            border='2px solid #e2e8f0'
            borderRadius='5px'
            mt='1rem'
            p={{ base: '1.5rem 0.5rem', md: '1rem 2rem' }}
         >
            <AddCvImg cvImgFromLocalStorage={postData?.cvImg} toEdit={toEdit} />

            <Input
               variant='unstyled'
               placeholder='New post title here...'
               fontSize={{ base: '2rem', md: '2.5rem' }}
               fontWeight='700'
               value={postData.title}
               height='60px'
               m='0'
               required
               onChange={({ target }) => setPostTitle(target.value)}
               _placeholder={{ color: '#525252' }}
            />

            <AddLangTag
               filteredTagsFromLocalStorage={postData?.filteredTags}
               toEdit={toEdit}
            />

            <Box mt='1.5rem !important' w='100%' mb='1rem !important'>
               <MDE
                  MDEValue={postData?.MDEValue}
                  height={230}
                  where='CREATE_POST'
                  isSubmitting={publishing}
                  setUploadingMDEImg={setUploadingMDEImg}
                  toEdit={toEdit}
               />
            </Box>

            <HStack justify='flex-end' w='100%'>
               {!toEdit && <SecondaryBtn>Save Draft</SecondaryBtn>}
               <PrimaryBtn
                  type='submit'
                  disabled={uploadingMDEImg || publishing}
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
   );
};

export default CreatePostFrom;
