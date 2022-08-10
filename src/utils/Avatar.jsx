import React from 'react';
import { Avatar } from '@chakra-ui/react';

const CustomAvatar = ({ name, src, size, onClick }) => {
   return (
      <Avatar
         name={name}
         src={src}
         w={size}
         h={size}
         cursor='pointer'
         transition='.3s'
         _hover={{ filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))' }}
         onClick={onClick}
      />
   );
};

export default CustomAvatar;
