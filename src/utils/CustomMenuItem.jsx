import React from 'react';
import { MenuItem } from '@chakra-ui/react';

const CustomMenuItem = ({ children, onClick, py, display }) => {
   return (
      <MenuItem
         py={py || '.5rem'}
         pos='relative'
         borderRadius='5px'
         _hover={{
            bg: 'rgb(59 73 223 / 10%)',
            color: 'rgb(47 58 178)',
         }}
         onClick={onClick}
         display={display}
      >
         {children}
      </MenuItem>
   );
};

export default CustomMenuItem;
