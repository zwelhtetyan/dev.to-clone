import {
   Box,
   Heading,
   HStack,
   Text,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BtnDefault, BtnRed } from './Buttons';

const DeleteConfirm = ({ title, onDismiss, onDelete, loading, type }) => {
   return (
      <VStack justify='center' flex='1' w='100%'>
         <VStack
            py={['2rem', '3rem']}
            px={['.5rem', '.5rem', '2rem']}
            maxW='900px'
            bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
            w='100%'
            borderRadius={['0', '0', '5px']}
            className='mde-preview shadow'
         >
            <Heading
               fontSize='1.3rem'
               fontWeight='700'
               className='mde-preview-content'
            >
               {title.length > 100 ? title.substring(0, 100) + '...' : title}
            </Heading>

            <Box
               className='shadowSecondary'
               my='1.5rem !important'
               w='100%'
               maxW='650px'
               p={{ base: '1rem .5rem', md: '1rem' }}
               borderRadius='5px'
               bg={useColorModeValue(
                  'light.cardSecondaryBg',
                  'dark.cardSecondaryBg'
               )}
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
                  {/* <Button
                     colorScheme='red'
                     onClick={onDelete}
                     disabled={loading}
                  >
                     {loading ? 'Deleting' : 'Delete'}
                  </Button> */}

                  <BtnDefault onClick={onDismiss}>Dismiss</BtnDefault>
                  <BtnRed onClick={onDelete} disabled={loading}>
                     {loading ? 'Deleting' : 'Delete'}
                  </BtnRed>
               </HStack>
            </Box>
         </VStack>
      </VStack>
   );
};

export default DeleteConfirm;
