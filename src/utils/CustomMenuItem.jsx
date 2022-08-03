import React from 'react';
import { MenuItem } from '@chakra-ui/react';

const CustomMenuItem = ({ children, onClick }) => {
   return (
      <MenuItem
         py='.5rem'
         borderRadius='5px'
         _hover={{
            bg: 'rgb(59 73 223 / 10%)',
            color: 'rgb(47 58 178)',
         }}
         onClick={onClick}
      >
         {children}
      </MenuItem>
   );
};

export default CustomMenuItem;
