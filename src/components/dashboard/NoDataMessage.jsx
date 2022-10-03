import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const NoDataMessage = ({ title, children }) => {
   return (
      <Box
         flex='1'
         px={['.5rem', '.5rem', '1rem']}
         py='7rem'
         borderRadius='5px'
         bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
         className='shadow'
         ms={{ base: '0 !important', md: '.5rem !important' }}
         display='flex'
         alignItems='center'
         flexDirection='column'
      >
         <Text textAlign='center'>{title}</Text>
         {children}
      </Box>
   );
};

export default NoDataMessage;
