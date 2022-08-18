import React from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';

const SideMenuItem = ({ icon, title, onClick }) => {
   return (
      <HStack
         cursor='pointer'
         p='.5rem'
         borderRadius='5px'
         _hover={{
            bg: 'rgb(59 73 223 / 10%)',
            color: 'rgb(47 58 178)',
         }}
         onClick={onClick}
      >
         <Image src={icon} alt='menu_icon' />
         <Text>{title}</Text>
      </HStack>
   );
};

export default SideMenuItem;
