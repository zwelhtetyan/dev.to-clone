import { HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

const SignUpButton = ({ bg, logo, type, text, hoverBg, color, onClick }) => {
   return (
      <HStack
         bg={bg}
         color={color || 'dark.color'}
         p='.7rem'
         borderRadius='5px'
         w='100%'
         justify='center'
         align='center'
         cursor='pointer'
         _hover={{ bg: hoverBg }}
         height='48px'
         transition='.3s'
         onClick={onClick}
      >
         <Image src={logo} alt='icon' />
         <Text>
            {type} {text}
         </Text>
      </HStack>
   );
};

export default SignUpButton;
