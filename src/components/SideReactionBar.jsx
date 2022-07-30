import { VStack } from '@chakra-ui/react';
import React from 'react';

const SideReactionBar = () => {
   return (
      <VStack
         bg={{ base: 'white', md: 'transparent' }}
         borderRight={{ base: 'none', md: '1px solid #E5E5E5' }}
         height={{ base: '4rem', md: '100vh' }}
         width={{ base: '100vw', md: '5rem' }}
         position='fixed'
         top={{ base: 'unset', md: '0' }}
         bottom={{ base: '0', md: 'unset' }}
         left={{ base: 0, md: 'unset' }}
         zIndex='1'
      ></VStack>
   );
};

export default SideReactionBar;
