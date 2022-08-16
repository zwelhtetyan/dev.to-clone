import React from 'react';
import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import dev_ghost from '../assets/images/devGhost.webp';
import { useNavigate } from 'react-router-dom';

const Error = () => {
   const navigate = useNavigate();
   return (
      <VStack justify='center' h='calc(100vh - 120px)'>
         <Image src={dev_ghost} alt='dev_ghost' />
         <Heading mt='0 !important' fontSize='5xl'>
            404
         </Heading>
         <Heading mt='0 !important' fontSize='2xl'>
            Page not found !
         </Heading>
         <Text
            color='rgb(59 73 223)'
            cursor='pointer'
            _hover={{ color: 'rgb(103 115 237 / 91%)' }}
            onClick={() => navigate('/')}
         >
            Back to home
         </Text>
      </VStack>
   );
};

export default Error;
