import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { titleRoute } from '../../helper/titleRoute';
import ManangePost from './ManangePost';

const DraftPostItem = ({ username, title, postId }) => {
   const navigate = useNavigate();

   const handleNavigate = () => {
      navigate(`/${titleRoute(username, title, postId)}`);
   };

   return (
      <Box
         bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
         className='shadow'
         borderRadius={{ base: '0', md: '5px' }}
         p={{ base: '.5rem', sm: '1rem' }}
         cursor='pointer'
         mb='.5rem'
         onClick={handleNavigate}
      >
         <Text
            bg='#FBBF24'
            color='dark.cardColor'
            px='5px'
            fontSize='13px'
            borderRadius='5px'
            display='inline-block'
         >
            Draft
         </Text>

         <Heading
            cursor='pointer'
            mt={2}
            w='100%'
            _hover={{
               color: useColorModeValue(
                  'light.headingHover',
                  'dark.headingHover'
               ),
            }}
            fontSize={['1.2rem', '1.5rem']}
            onClick={handleNavigate}
         >
            {title}
         </Heading>

         <Box w='100%' display='flex' justifyContent='flex-end'>
            <ManangePost postId={postId} m='0 0 0 auto' />
         </Box>
      </Box>
   );
};

export default DraftPostItem;
