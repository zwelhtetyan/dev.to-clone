import React from 'react';
import { MenuItem, useColorModeValue } from '@chakra-ui/react';

const CustomMenuItem = ({ children, onClick, py }) => {
   return (
      <MenuItem
         py={py || '.5rem'}
         pos='relative'
         borderRadius='5px'
         _hover={{
            bg: useColorModeValue('light.secondary', 'dark.secondary'),
            color: useColorModeValue('light.headingHover', 'dark.headingHover'),
         }}
         onClick={onClick}
      >
         {children}
      </MenuItem>
   );
};

export default CustomMenuItem;
