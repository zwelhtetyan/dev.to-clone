import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Right = () => {
   return (
      <Box flex='1' ms={{ base: '0 !important', md: '.5rem !important' }}>
         <Outlet />
      </Box>
   );
};

export default Right;
