import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { deletePost } from '../lib/api';

const DeleteConfirm = () => {
   const navigate = useNavigate();

   const user = useAuth();

   const currentPostData = useSelector(
      (state) => state.currentPost.currentPostData
   );

   if (!user || !currentPostData) {
      return <Navigate to='/' />;
   }

   const onDelete = () => {
      deletePost(currentPostData.id).then(() => {
         navigate('/dashboard');
      });
   };

   const handleDismiss = () => {
      navigate(-1);
   };

   return (
      <Box p={{ base: '1rem 0.5rem', md: '1rem' }}>
         <VStack
            mt='3rem !important'
            p={{ base: '2rem .5rem', md: '2rem 1rem' }}
            maxW='900px'
            w='100%'
            m='auto'
            bg='white'
            boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
            borderRadius='5px'
         >
            <Text
               textAlign='center'
               fontSize={{ base: '1.2rem', md: '1.5rem' }}
               fontWeight='700'
            >
               {currentPostData?.title}
            </Text>
            <Box
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               my='1.5rem !important'
               width={{ base: '100%', md: '500px' }}
               p={{ base: '1rem .5rem', md: '1rem' }}
               borderRadius='5px'
               bg='#FAFAFA'
            >
               <Text
                  fontSize={{ base: '1.1rem', md: '1.3rem' }}
                  fontWeight='500'
               >
                  Are you sure you want to delete this article?
               </Text>
               <Text mt={{ md: '1' }} fontSize={{ md: '1.1rem' }}>
                  You cannot undo this action.
               </Text>

               <HStack mt='.7rem' justify='flex-end'>
                  <Button onClick={handleDismiss}>Dismiss</Button>
                  <Button colorScheme='red' onClick={onDelete}>
                     Delete
                  </Button>
               </HStack>
            </Box>
         </VStack>
      </Box>
   );
};

export default DeleteConfirm;
