import React from 'react';
import { Box } from '@chakra-ui/react';
import Menu from '../menu/Menu';

const HomeMenu = () => {
   return (
      <Box
         flex='1'
         pe='1rem'
         maxW='280px'
         display={{ base: 'none', md: 'block' }}
      >
         <Menu heroPadding='.7rem' />
      </Box>
   );
};

export default HomeMenu;
