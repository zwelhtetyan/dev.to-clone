import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Card = ({ children }) => {
   return (
      <Box
         mt={{ base: '-.5rem', xl: '0' }}
         flex={1}
         w='100%'
         bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
         className='shadow'
         maxW='1000px'
         fontSize={{ base: '1.05rem', md: '1.2rem' }}
         p={{ base: '1rem .5rem 2rem .5rem', md: '2rem 3rem' }}
         borderRadius={{ base: '0', md: '5px' }}
      >
         {children}
      </Box>
   );
};

export default Card;
