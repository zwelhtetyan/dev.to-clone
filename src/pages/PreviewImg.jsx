import { Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

const PreviewImg = () => {
   const { url } = useParams();

   return (
      <VStack
         alignItems='center'
         justifyContent='center'
         w='100%'
         h='100vh'
         bg='#0e0e0e'
         pos='fixed'
         top='0'
         left='0'
      >
         <Image src={url} maxW='1000px' />
      </VStack>
   );
};

export default PreviewImg;
