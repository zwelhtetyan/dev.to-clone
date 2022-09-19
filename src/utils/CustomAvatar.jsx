import React from 'react';
import { Box } from '@chakra-ui/react';
import defaultProfile from '../assets/images/default_profile.webp';

const CustomAvatar = ({ profile, size, onClick }) => {
   return (
      <Box
         boxSize={size}
         backgroundImage={profile || defaultProfile}
         borderRadius='full'
         backgroundPosition='center'
         backgroundSize='cover'
         backgroundRepeat='no-repeat'
         cursor='pointer'
         transition='.3s'
         _hover={{ filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))' }}
         onClick={onClick}
      />
   );
};

export default CustomAvatar;
