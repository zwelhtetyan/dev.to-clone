import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { titleRoute } from '../../helper/titleRoute';
import ManangePost from './ManangePost';

const DraftPostItem = ({ name, title, postId }) => {
   const navigate = useNavigate();

   const handleNavigate = () => {
      navigate(`/${titleRoute(name, title, postId)}`);
   };

   return (
      <Box
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         _hover={{ boxShadow: '0 0 0 1.5px rgb(23 23 23 / 10%)' }}
         borderRadius={{ base: '0', md: '5px' }}
         p={{ base: '.5rem', sm: '1rem' }}
         cursor='pointer'
         mb='.5rem'
         onClick={handleNavigate}
      >
         <Text
            bg='#FCD34D'
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
            _hover={{ color: 'rgb(47 58 178)' }}
            fontSize={['1.2rem', '1.5rem']}
            onClick={handleNavigate}
            color='rgb(23 23 23)'
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
