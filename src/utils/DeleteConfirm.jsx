import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const DeleteConfirm = ({ title, onDismiss, onDelete, loading, type }) => {
   return (
      <VStack h='calc(100vh - 120px)' justify='center'>
         <VStack
            p='3rem 1rem'
            maxW='900px'
            w='100%'
            bg='white'
            boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
            borderRadius={['0', '0', '5px']}
            className='mde-preview'
         >
            <Heading
               fontSize={{ base: '1.3rem', md: '1.5rem' }}
               fontWeight='700'
               className='mde-preview-content'
            >
               {title.length > 100 ? title.substring(0, 100) + '...' : title}
            </Heading>
            <Box
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               my='1.5rem !important'
               w='100%'
               maxW='650px'
               p={{ base: '1rem .5rem', md: '1rem' }}
               borderRadius='5px'
               bg='#FAFAFA'
            >
               <Text
                  fontSize={{ base: '1.1rem', md: '1.3rem' }}
                  fontWeight='600'
               >
                  Are you sure you want to delete this{' '}
                  {type === 'post' ? 'article' : 'comment'}?
               </Text>
               <Text mt={{ md: '1' }} fontSize={{ md: '1.1rem' }}>
                  You cannot undo this action.
               </Text>

               <HStack mt='.7rem' justify='flex-end'>
                  <Button onClick={onDismiss}>Dismiss</Button>
                  <Button
                     colorScheme='red'
                     onClick={onDelete}
                     disabled={loading}
                  >
                     {loading ? 'Deleting' : 'Delete'}
                  </Button>
               </HStack>
            </Box>
         </VStack>
      </VStack>
   );
};

export default DeleteConfirm;
