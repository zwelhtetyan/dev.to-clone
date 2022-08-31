import React from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';

const SideMenuItem = ({ icon, title, onClick, savedPosts, bg, color, mb }) => {
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
         bg={bg}
         color={color}
         mb={1}
      >
         {icon && <Image src={icon} alt='menu_icon' />}
         <Text>{title}</Text>
         {savedPosts && (
            <Text
               bg='rgb(212 212 212)'
               color='rgb(64 64 64)'
               fontSize='13px'
               px='5px'
               borderRadius='5px'
            >
               {savedPosts}
            </Text>
         )}
      </HStack>
   );
};

export default SideMenuItem;
