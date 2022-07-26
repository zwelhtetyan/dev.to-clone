import React, { useRef } from 'react';
import logo from '../assets/logo/logo.png';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import { VscClose } from 'react-icons/vsc';
import MDE from '../components/MDE';
import { useNavigate } from 'react-router-dom';
import AddLangTag from '../components/LangTag/AddLangTag';
import { useSelector } from 'react-redux';
import AddCvImg from '../components/AddCvImg';
import { Box, HStack, Image, Input, Text, VStack } from '@chakra-ui/react';

const CreatePost = () => {
   //scroll top
   window.scrollTo(0, 0);

   //redux store
   const publicPost = useSelector((state) => state.publicPost);

   //state
   const postTitleRef = useRef();

   const navigate = useNavigate();

   const publishPostHandler = () => {
      console.log(publicPost.cvImgUrl);
      console.log(postTitleRef.current.value);
      console.log(publicPost.filteredTags);
      console.log(publicPost.MDEValue);
   };

   return (
      <Box maxW='768px' m='auto'>
         <HStack justify='space-between'>
            <HStack>
               <Image src={logo} alt='logo' w='58px' h='40px' />
               <Text fontSize='xl'>Create Post</Text>
            </HStack>
            <SecondaryBtn onClick={() => navigate('/')}>
               <VscClose size={23} />
            </SecondaryBtn>
         </HStack>

         <VStack
            align='start'
            bg='white'
            border='2px solid #e2e8f0'
            borderRadius='5px'
            mt='1rem'
            p={{ base: '1.5rem 0.5rem', md: '2rem' }}
         >
            <AddCvImg />

            <Input
               variant='unstyled'
               placeholder='New post title here...'
               fontSize='1.7rem'
               fontWeight='700'
               ref={postTitleRef}
               _placeholder={{ color: '#525252' }}
            />

            <AddLangTag />

            <MDE />

            <HStack justify='flex-end' w='100%'>
               <SecondaryBtn>Save Draft</SecondaryBtn>
               <PrimaryBtn onClick={publishPostHandler}>Publish</PrimaryBtn>
            </HStack>
         </VStack>
      </Box>
   );
};

export default CreatePost;
