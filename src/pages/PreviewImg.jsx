import { Box, Image, VStack } from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';

const PreviewImg = () => {
   const { url } = useParams();

   return (
      <Box p={{ base: '1rem 0.5rem', md: '1rem' }}>
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
            <Image src={url} maxW='100%' maxH='100%' alt='preview_img' />
         </VStack>
      </Box>
   );
};

export default PreviewImg;
