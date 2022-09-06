import React from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';
import IconBadge from './IconBadge';

const SideMenuItem = ({ icon, title, onClick, savedPostsCount, bg, color }) => {
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

         {savedPostsCount && <IconBadge value={savedPostsCount} />}
      </HStack>
   );
};

export default SideMenuItem;
