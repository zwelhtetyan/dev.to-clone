import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Right = () => {
   return (
      <Box flex='1' ms={{ base: '0 !important', md: '.5rem !important' }}>
         <Outlet />
      </Box>
      // <Box
      //    flex='1'
      //    p={['.5rem', '.5rem', '1rem']}
      //    borderRadius='5px'
      //    bg='white'
      //    boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
      //    ms={{ base: '0 !important', md: '.5rem !important' }}
      // >
      //    <Outlet />
      // </Box>
   );
};

export default Right;
